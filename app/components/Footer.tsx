import PrivacyChoices from "./PrivacyChoices";

export default function Footer() {
  return (
    <footer className="py-8 text-muted">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-3 px-4">
        <div>© ThePetSwap. All rights reserved.</div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <a href="/privacy" className="text-brand-dark hover:underline">
            Privacy
          </a>
          <a href="/terms" className="text-brand-dark hover:underline">
            Terms
          </a>
          <a href="/support" className="text-brand-dark hover:underline">
            Support
          </a>
          <a href="/delete-account" className="text-brand-dark hover:underline">
            Delete account
          </a>
          <PrivacyChoices />
          <a href="mailto:support@thepetswap.com" className="text-brand-dark hover:underline">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}
