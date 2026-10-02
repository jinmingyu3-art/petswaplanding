"use server";

/*
  Turns reminder emails off for the member a signed link names
  (petswap-community#106).

  The link in a reminder email opens this page rather than unsubscribing on
  its own, because mail security scanners open every link in a message, and a
  link that unsubscribed on a plain visit would switch members off without
  anybody pressing anything. Here a person presses a button, and only then
  does this post to the app's email-links function.

  The signature is checked there, by the function that holds the secret. This
  side never sees the secret and cannot make a link of its own.

  Which project to ask is chosen from two known addresses, never read from
  the link, so a link cannot send this server's request anywhere else.
*/
const PRODUCTION = process.env.NEXT_PUBLIC_SUPABASE_URL;
const STAGING = "https://tfgudrcmdzdwrsrmkznu.supabase.co";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type UnsubscribeState = { done: boolean; message: string } | null;

export async function unsubscribe(_prev: UnsubscribeState, form: FormData): Promise<UnsubscribeState> {
  const member = String(form.get("m") ?? "");
  const signature = String(form.get("s") ?? "");
  const base = form.get("env") === "staging" ? STAGING : PRODUCTION;
  if (!UUID.test(member) || !signature || !base) {
    return { done: false, message: "This unsubscribe link is not complete. You can turn reminder emails off in the app, under Profile, then Email reminders." };
  }
  try {
    const url = `${base}/functions/v1/email-links?unsubscribe=${encodeURIComponent(member)}&s=${encodeURIComponent(signature)}`;
    const res = await fetch(url, { method: "POST", cache: "no-store" });
    if (res.ok) {
      return { done: true, message: "You're unsubscribed from reminder emails. You'll still get emails when a swap is confirmed or canceled." };
    }
    if (res.status === 400) {
      return { done: false, message: "This unsubscribe link is not valid. You can turn reminder emails off in the app, under Profile, then Email reminders." };
    }
    console.error("[unsubscribe] email-links answered", res.status, await res.text());
  } catch (err) {
    console.error("[unsubscribe] could not reach email-links:", err instanceof Error ? err.message : err);
  }
  return { done: false, message: "We could not update your settings just now. Please try again, or turn reminder emails off in the app under Profile, then Email reminders." };
}
