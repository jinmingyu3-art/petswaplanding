import Link from "next/link";
import Footer from "./Footer";
import { isHeading, paragraphs, type LegalDoc } from "../lib/legal";

export default function LegalPage({ title, doc }: { title: string; doc: LegalDoc | null }) {
  return (
    <main>
      <div className="mx-auto max-w-content px-4 py-10">
        <Link href="/" className="text-brand-dark hover:underline">ThePetSwap</Link>
        <h1 className="mt-6 text-3xl font-bold">{title}</h1>
        {doc ? (
          <>
            <p className="mt-2 text-muted">
              Version {doc.version}
              {doc.effectiveDate ? `, effective ${new Date(doc.effectiveDate + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}` : ""}
            </p>
            <div className="mt-8 space-y-4 leading-relaxed">
              {paragraphs(doc.body).map((p, i) =>
                isHeading(p) ? (
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
            <a href="mailto:thepetswap@gmail.com" className="text-brand-dark hover:underline">thepetswap@gmail.com</a>.
          </p>
        )}
      </div>
      <Footer />
    </main>
  );
}
