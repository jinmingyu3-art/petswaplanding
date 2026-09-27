import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { latestPublished } from "../lib/legal";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Privacy Policy | ThePetSwap" };

export default async function PrivacyPage() {
  return <LegalPage title="Privacy Policy" doc={await latestPublished("privacy")} />;
}
