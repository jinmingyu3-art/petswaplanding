import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Support | ThePetSwap",
  description: "How to get help with ThePetSwap.",
};

const EMAIL = "support@thepetswap.com";

export default function SupportPage() {
  return (
    <main>
      <div className="mx-auto max-w-content px-4 py-10 leading-relaxed">
        <Link href="/" className="text-brand-dark hover:underline">ThePetSwap</Link>
        <h1 className="mt-6 text-3xl font-bold">Support</h1>

        <section className="mt-8 rounded-lg border-2 border-red-600 p-4">
          <h2 className="text-xl font-semibold">In an emergency</h2>
          <p className="mt-2">
            If a person is in danger, call 911. If a pet is hurt or ill, call a vet or an emergency animal hospital
            straight away.
          </p>
          <p className="mt-2">
            ThePetSwap is not an emergency service. We cannot send help, and email is not checked around the clock.
            During a swap, the Emergency page in the app has the pet&apos;s vet and emergency contacts.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Get help</h2>
          <p className="mt-2">
            Email us at{" "}
            <a href={`mailto:${EMAIL}`} className="text-brand-dark hover:underline">{EMAIL}</a>. A person reads every
            message. You can also write to us from the app: open the Profile tab and tap Help &amp; support.
          </p>
          <p className="mt-4">It helps if you tell us:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>The email address you use to sign in.</li>
            <li>What happened, and what you expected to happen.</li>
            <li>Which swap or member it is about, if any.</li>
            <li>Your phone (iPhone or Android) and the app version. It is at the bottom of the Profile tab.</li>
            <li>A screenshot, if you have one.</li>
          </ul>
          <p className="mt-4">
            Please do not send your password or a photo of your ID by email. We will never ask for them.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Report a member</h2>
          <p className="mt-2">
            You can report or block a member from their profile or from your chat with them. Our team reviews
            every report. If you feel unsafe, call 911 first and tell us afterwards.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Delete your account</h2>
          <p className="mt-2">You can delete your account yourself in the app:</p>
          <ol className="mt-2 list-decimal space-y-1 pl-6">
            <li>Open the Profile tab.</li>
            <li>Under Privacy &amp; account, tap Your data.</li>
            <li>Tap Delete your account and confirm.</li>
          </ol>
          <p className="mt-2">
            If you are in the middle of a swap, finish or cancel it first. The app will tell you if that is what is
            stopping you. You can download a copy of your data from the same screen. If you cannot open the app,
            email us from the address on your account and we will help.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Privacy and terms</h2>
          <p className="mt-2">
            Read our <Link href="/privacy" className="text-brand-dark hover:underline">Privacy Policy</Link> and our{" "}
            <Link href="/terms" className="text-brand-dark hover:underline">Terms of Service</Link>.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
