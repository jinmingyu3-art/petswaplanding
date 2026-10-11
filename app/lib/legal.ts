/*
  The Privacy Policy and Terms, read from ThePetSwap's database.

  The app shows members the same documents from public.terms_versions, and a
  published version is readable by anyone ("Published terms are public"). The
  website reads that one copy rather than keeping its own, so the site and the
  app cannot drift apart when counsel issues a new version.
*/
export type LegalDoc = { version: number; label: string | null; effectiveDate: string | null; body: string };

/*
  Counsel's version number for each published row, so the site says "Version
  1.4" where the app does, rather than the row's sequence number.

  terms_versions numbers rows 1, 2, 3 per document and does not store
  counsel's label; the app carries it in lib/legalDocuments.ts in the petswap
  repo. Until 11 October the site printed the row number, so Privacy Policy
  1.0 read "Version 1" here and "Version 1.0" in the app, and Terms 1.8 read
  "Version 4". Publishing Privacy 1.4 as row 2 would have made that "Version
  2" against the app's "Version 1.4" (petswap-community#50).

  This is a second copy of the label, so it is built to fail quietly in the
  harmless direction: a row it does not know prints the effective date and no
  number, never a number that disagrees with the app. Add a line here when
  scripts/publish-terms.mjs publishes a new version.
*/
const COUNSEL_VERSION: Record<"privacy" | "terms", Record<number, string>> = {
  privacy: { 1: "1.0", 2: "1.4" },
  terms: { 4: "1.8" },
};

export async function latestPublished(document: "privacy" | "terms"): Promise<LegalDoc | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const q = `${url}/rest/v1/terms_versions?document=eq.${document}&published_at=not.is.null&order=version.desc&limit=1&select=version,effective_date,body`;
  try {
    const res = await fetch(q, { headers: { apikey: key }, next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const rows = (await res.json()) as { version: number; effective_date: string | null; body: string }[];
    const row = rows[0];
    return row
      ? { version: row.version, label: COUNSEL_VERSION[document][row.version] ?? null, effectiveDate: row.effective_date, body: row.body }
      : null;
  } catch {
    return null;
  }
}

const isShort = (p: string) =>
  p.length <= 80 && !p.includes("\n") && !/[.:;,)]$/.test(p) && !p.startsWith("•");
const isShouting = (p: string) => /[A-Z]/.test(p) && p === p.toUpperCase();

/*
  Whether paragraph i is a section heading. The stored text is flat, so a
  heading is recognised by shape: a short line with no closing punctuation
  that starts a section. The Retention table is also short lines, so a short
  line that follows another short line is a table cell, not a heading; and a
  heading may be followed by an all-capital warning line ("PLEASE READ THIS
  SECTION CAREFULLY"). Checked against Privacy 1 and Terms 4: 21 and 34
  headings, and no table cells. Privacy 2 (counsel's 1.4) gives its 21 section
  headings and no table cells too, checked before it was published.
*/
export function isHeadingAt(ps: string[], i: number): boolean {
  const p = ps[i], prev = ps[i - 1], next = ps[i + 1];
  if (!isShort(p) || (isShouting(p) && next !== undefined && isShouting(next))) return false;
  if (prev !== undefined && prev.length <= 80 && !isShouting(prev)) return false;
  return next === undefined || !isShort(next) || next === "Category" || isShouting(next);
}

export function paragraphs(body: string): string[] {
  return body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
