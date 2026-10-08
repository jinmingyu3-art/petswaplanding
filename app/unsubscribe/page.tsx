import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import UnsubscribeForm from "./UnsubscribeForm";

/*
  Where the unsubscribe link in a reminder email lands (petswap-community#106).

  One sentence and one button. Visiting this page changes nothing: a mail
  scanner that opens the link sees the page and goes away, and a member who
  wants reminders off presses the button. Gmail's and Apple Mail's own
  Unsubscribe button does not come here at all; it posts straight to the
  email-links function (RFC 8058).
*/
export const metadata: Metadata = {
  title: "Email reminders | ThePetSwap",
  robots: { index: false, follow: false },
};

type Search = Promise<{ [key: string]: string | string[] | undefined }>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function UnsubscribePage({ searchParams }: { searchParams: Search }) {
  const q = await searchParams;
  const m = one(q.m);
  const s = one(q.s);
  const env = one(q.env) === "staging" ? "staging" : "production";
  return (
    <main>
      <div className="mx-auto max-w-content px-4 py-10">
        <Link href="/" className="text-brand-dark hover:underline">ThePetSwap</Link>
        <h1 className="mt-6 text-3xl font-bold">Email reminders</h1>
        {m && s ? (
          <>
            <p className="mt-4 text-lg leading-relaxed">
              Turn off reminder emails about upcoming swaps, reviews, unread messages and requests waiting for an answer?
              You&apos;ll still get emails when a swap is confirmed or canceled.
            </p>
            <UnsubscribeForm m={m} s={s} env={env} />
          </>
        ) : (
          <p className="mt-4 text-lg leading-relaxed">
            This link is not complete. You can turn reminder emails off in the app, under Profile, then Email reminders.
          </p>
        )}
      </div>
      <Footer />
    </main>
  );
}
