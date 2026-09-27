import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { latestPublished } from "../lib/legal";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Terms of Service | ThePetSwap" };

export default async function TermsPage() {
  return <LegalPage title="Terms of Service" doc={await latestPublished("terms")} />;
}
