import PrivacyChoices from "./PrivacyChoices";

export default function Footer() {
  return (
    <footer className="py-8 text-muted">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-3 px-4">
        <div>© ThePetSwap. All rights reserved.</div>
        <nav className="flex gap-4">
          {/* <a href="#" className="text-brand-dark hover:underline">
            Privacy
          </a>
          <a href="#" className="text-brand-dark hover:underline">
            Terms
          </a> */}
          <PrivacyChoices />
          <a href="mailto:thepetswap@gmail.com" className="text-brand-dark hover:underline">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}
