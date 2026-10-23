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
          <h2 className="text-xl font-semibold">Emergencies</h2>
          {/* The same line the app's Contact Support draws (petswap-community#236). */}
          <p className="mt-2">
            In an emergency, call 911. If a pet needs urgent medical care, call a veterinarian.
          </p>
          <p className="mt-2">
            ThePetSwap is not an emergency service. We cannot send help, and we only answer during support hours.
            During a swap, the Emergency page in the app has the pet&apos;s vet and emergency contacts.
          </p>
        </section>

        {/*
          Julia on petswap-community#236, 23 October: support hours, and different
          wording for urgent safety reports and general questions. Her sentences,
          word for word, and her hours in the app's clock ("8 AM–10 PM"), so the
          site and the app read the same. Nothing here may promise a faster or
          round-the-clock reply.
        */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Support hours</h2>
          <p className="mt-2">Every day, 8 AM–10 PM Pacific.</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Safety reports:</strong> We prioritize urgent safety reports and respond as soon as possible
              during support hours.
            </li>
            <li>
              <strong>General questions:</strong> We usually respond within 1–2 business days.
            </li>
          </ul>
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
          <p className="mt-2">
            See{" "}
            <Link href="/delete-account" className="text-brand-dark hover:underline">what we delete and what we keep</Link>
            {" "}when you delete your account.
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
