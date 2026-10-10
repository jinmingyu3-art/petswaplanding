import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";

// Google Play asks for an account deletion URL that works without the app:
// it must name the app, give the steps, and say what is deleted, what is kept
// and for how long. Every retention line below is one the Privacy Policy 1.0
// already makes (its Retention table and its Account Deletion section), and
// "what we delete" was checked against the foreign keys delete_my_account
// cascades through. Change the Policy and this page together.

export const metadata: Metadata = {
  title: "Delete your account | ThePetSwap",
  description: "How to delete your ThePetSwap account, and what happens to your data.",
};

const EMAIL = "support@thepetswap.com";

export default function DeleteAccountPage() {
  return (
    <main>
      <div className="mx-auto max-w-content px-4 py-10 leading-relaxed">
        <Link href="/" className="text-brand-dark hover:underline">ThePetSwap</Link>
        <h1 className="mt-6 text-3xl font-bold">Delete your ThePetSwap account</h1>
        <p className="mt-4">
          This is how to delete your account in the ThePetSwap app, and what happens to your data when you do.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">In the app</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-6">
            <li>Open the Profile tab.</li>
            <li>Under Privacy &amp; account, tap Your data.</li>
            <li>Tap Delete your account.</li>
            <li>Type DELETE, tap Delete my account, and confirm.</li>
          </ol>
          <p className="mt-2">
            You can download a copy of your data from the same screen first.
          </p>
          <p className="mt-2">
            If you are in the middle of a swap, finish or cancel it first. The app will tell you if that is what is
            stopping you.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">By email</h2>
          <p className="mt-2">
            Can&apos;t open the app? Email{" "}
            <a href={`mailto:${EMAIL}`} className="text-brand-dark hover:underline">{EMAIL}</a> from the address on
            your account and ask us to delete it. We will confirm when it is done.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">What we delete</h2>
          <p className="mt-2">
            Your profile, your pets and their photos, your messages, your swap history, your points, your contact
            details and your verification files.
          </p>
          <p className="mt-2">
            Conversations you are part of are deleted for the other person too. Reviews you wrote, and reviews written
            about you, are removed.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">What we keep, and for how long</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Safety reports and the actions our team took on them, generally for 3 years after the final action.</li>
            <li>Photos attached to a safety report, generally for 24 months after the report is closed.</li>
            <li>A short record of a refused verification, without the images, for up to 24 months.</li>
            <li>Messages you sent to our support team, for as long as we need them to resolve and record your request.</li>
            <li>Server logs, which are deleted after 7 days.</li>
            <li>Backups, which expire within 7 days.</li>
            <li>
              A record of your account number and the date it was deleted, with no name or email in it. We keep it so a
              restored backup cannot bring your account back.
            </li>
          </ul>
          <p className="mt-4">
            Another member&apos;s points history may keep a line for a swap with you, without your name.
          </p>
          <p className="mt-2">
            We may keep something longer if the law requires it, or while a safety, fraud or legal matter is still
            open. Our <Link href="/privacy" className="text-brand-dark hover:underline">Privacy Policy</Link> has the
            details.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Questions?</h2>
          <p className="mt-2">
            Email <a href={`mailto:${EMAIL}`} className="text-brand-dark hover:underline">{EMAIL}</a>. A person reads
            every message.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
