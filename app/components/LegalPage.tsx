import Link from "next/link";
import Footer from "./Footer";
import { isHeadingAt, paragraphs, type LegalDoc } from "../lib/legal";

// "Version 1.4, effective September 14, 2026", the same words the app draws.
// A row without a known label says only when it took effect (see legal.ts).
function versionLine(doc: LegalDoc): string {
  const effective = doc.effectiveDate
    ? new Date(doc.effectiveDate + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;
  if (doc.label && effective) return `Version ${doc.label}, effective ${effective}`;
  if (doc.label) return `Version ${doc.label}`;
  return effective ? `Effective ${effective}` : "";
}

export default function LegalPage({ title, doc }: { title: string; doc: LegalDoc | null }) {
  return (
    <main>
      <div className="mx-auto max-w-content px-4 py-10">
        <Link href="/" className="text-brand-dark hover:underline">ThePetSwap</Link>
        <h1 className="mt-6 text-3xl font-bold">{title}</h1>
        {doc ? (
          <>
            <p className="mt-2 text-muted">{versionLine(doc)}</p>
            <div className="mt-8 space-y-4 leading-relaxed">
              {paragraphs(doc.body).map((p, i, all) =>
                isHeadingAt(all, i) ? (
                  <h2 key={i} className="pt-4 text-xl font-semibold">{p}</h2>
                ) : (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                )
              )}
            </div>
          </>
        ) : (
          <p className="mt-6">
            This page could not be loaded just now. Please try again, or email{" "}
            <a href="mailto:support@thepetswap.com" className="text-brand-dark hover:underline">support@thepetswap.com</a>.
          </p>
        )}
      </div>
      <Footer />
    </main>
  );
}
