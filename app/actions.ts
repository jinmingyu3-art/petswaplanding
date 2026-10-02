"use server";

import { z } from "zod";

/*
  The waitlist lives in the app's Supabase database now, not Neon.

  The form calls public.join_waitlist with the public anon key. That function
  can only add a row, and answers with one word: "added", "already_on_list"
  or "invalid". It never returns anybody's data, and the table itself is not
  readable or writable with this key. The list is read in the app's admin
  screen, which is why /admin/waitlist is gone from this site.
*/
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type JoinAnswer = "added" | "already_on_list" | "invalid";

async function callJoinWaitlist(args: Record<string, string | null>): Promise<JoinAnswer> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/join_waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`join_waitlist answered ${res.status}: ${await res.text()}`);
  }
  const answer = (await res.json()) as unknown;
  if (answer === "added" || answer === "already_on_list" || answer === "invalid") return answer;
  throw new Error(`join_waitlist gave an answer this form does not know: ${JSON.stringify(answer)}`);
}

/** A single, consistent state shape for useFormState */
export type ActionState = {
  ok: boolean;
  message?: string; // present on error or success (optional)
  fieldErrors?: Record<string, string>; // keyed by field name
};

const Waitlist = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(200, "Please use 200 characters or fewer."),
  email: z.email("Please enter a valid email.").max(254, "Please enter a valid email."),
  city: z.string().max(100, "Please use 100 characters or fewer.").optional().nullable(),
  state: z.string().max(2, "Use 2-letter state code.").regex(/^([A-Z]{2})?$/, "Use 2-letter state code."),
  zip: z.string().max(10, "Please enter a valid ZIP code.").optional().nullable(),
  petType: z.enum(["Dog", "Cat", "Other"], { message: "Choose a pet type." }),
  other: z.string().max(100).optional().nullable(),
  referral: z.string().max(200, "Please use 200 characters or fewer.").optional().nullable(),
  hp: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.petType === "Other" && !data.other) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["other"],
      message: "Please specify your pet type.",
    });
  }
});

function toFieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  const flat = err.flatten().fieldErrors as Record<string, string[]>;
  for (const [key, msgs] of Object.entries(flat)) {
    if (msgs?.[0]) out[key] = msgs[0]!;
  }
  return out;
}

export async function joinWaitlist(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
   // Normalize inputs
  const rawEmail = String(formData.get("email") || "");
  const normalizedEmail = rawEmail.trim().toLowerCase(); // ← key line

  // read form
  const data = {
    name: formData.get("name"),
    email: normalizedEmail,
    city: formData.get("city"),
    state: String(formData.get("state") || "").toUpperCase(),
    zip: formData.get("zip"),
    petType: formData.get("petType"),
    other: formData.get("other"),
    referral: formData.get("referral") || null,
    hp: String(formData.get("pswp_leave_empty") || ""),
  };

  const parsed = Waitlist.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  // bot: silently accept
  /*
    Filled in by a bot, which is told it worked and saved nowhere. Logged, so
    a run of these is visible in Vercel's logs rather than looking like a
    quiet day (#225).
  */
  if (parsed.data.hp) {
    console.warn("waitlist: hidden field filled, not saved", { length: parsed.data.hp.length });
    return { ok: true, message: "You\u2019re on the list! We\u2019ll email you when your city goes live." };
  }

  try {
    const userAgent = (formData.get("userAgent") as string) || null;
    const answer = await callJoinWaitlist({
      signup_name: parsed.data.name,
      signup_email: parsed.data.email,
      signup_city: parsed.data.city ?? null,
      signup_state: parsed.data.state || null,
      signup_zip: parsed.data.zip ?? null,
      signup_pet_type: parsed.data.petType === "Other" ? parsed.data.other ?? null : parsed.data.petType,
      signup_referral: parsed.data.referral ?? null,
      signup_user_agent: userAgent,
    });

    if (answer === "already_on_list") {
      console.info("waitlist: already on the list");
      return {
        ok: false,
        message: "That email is already on the waitlist.",
        fieldErrors: { email: "This email is already registered." },
      };
    }

    // The database checks the same things zod does, so this is a field zod
    // let through and the database did not, such as a malformed address.
    if (answer === "invalid") {
      console.info("waitlist: refused by the database as invalid");
      return {
        ok: false,
        message: "Please fix the highlighted fields and try again.",
      };
    }

    // One line per saved signup and per refusal, so Vercel's logs show the
    // form working on a day nobody signs up as clearly as on a busy one (#225).
    console.info("waitlist: added");
    return {
      ok: true,
      message: "You’re on the list! We’ll email you when your city goes live.",
    };
  } catch (e: unknown) {
    // Logged, because the message below cannot say why.
    console.error("joinWaitlist", e instanceof Error ? e.message : e);
    return {
      ok: false,
      message: "We couldn’t save your signup right now. Please try again.",
    };
  }
}
