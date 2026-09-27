/*
  The Privacy Policy and Terms, read from ThePetSwap's database.

  The app shows members the same documents from public.terms_versions, and a
  published version is readable by anyone ("Published terms are public"). The
  website reads that one copy rather than keeping its own, so the site and the
  app cannot drift apart when counsel issues a new version.
*/
export type LegalDoc = { version: number; effectiveDate: string | null; body: string };

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
    return row ? { version: row.version, effectiveDate: row.effective_date, body: row.body } : null;
  } catch {
    return null;
  }
}

/** A short line with no closing punctuation and no bullet is a heading. */
export function isHeading(paragraph: string): boolean {
  const p = paragraph.trim();
  return p.length > 0 && p.length <= 80 && !p.includes("\n") && !/[.:;,)]$/.test(p) && !p.startsWith("•");
}

export function paragraphs(body: string): string[] {
  return body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
