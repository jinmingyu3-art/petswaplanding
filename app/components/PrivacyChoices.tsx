"use client";

import { useEffect, useState } from "react";
import { hasOptedOut, optOut, sendsGlobalPrivacyControl } from "./privacyChoice";

/*
  "Your Privacy Choices": turns off the Meta Pixel for this browser and
  remembers it (petswap-community#50).
*/
export default function PrivacyChoices() {
  const [state, setState] = useState<"unknown" | "tracking" | "off">("unknown");
  useEffect(() => {
    setState(sendsGlobalPrivacyControl() || hasOptedOut() ? "off" : "tracking");
  }, []);

  const onClick = () => {
    if (state === "tracking") {
      optOut();
      window.location.reload();
      return;
    }
    window.alert(
      sendsGlobalPrivacyControl()
        ? "Your browser sends Global Privacy Control, so this site does not share your activity with advertising partners."
        : "You have opted out. This browser does not share your activity with advertising partners."
    );
  };

  return (
    <button type="button" onClick={onClick} className="text-brand-dark hover:underline">
      Your Privacy Choices
    </button>
  );
}
