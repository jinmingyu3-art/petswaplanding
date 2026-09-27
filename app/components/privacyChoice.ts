/*
  Whether this browser may be tracked by the Meta Pixel.

  Privacy Policy 1.4 says that where required, ThePetSwap honours opt-out
  preference signals such as Global Privacy Control and gives a way to opt out
  of sale or sharing. So the Pixel loads only when the browser has not sent
  GPC and the visitor has not opted out here (petswap-community#50).
*/
export const OPT_OUT_KEY = "tps-opt-out-sale-share";

export function sendsGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function hasOptedOut(): boolean {
  try {
    return window.localStorage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    // Storage blocked: assume they would not want tracking.
    return true;
  }
}

export function trackingAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return !sendsGlobalPrivacyControl() && !hasOptedOut();
}

export function optOut(): void {
  try {
    window.localStorage.setItem(OPT_OUT_KEY, "1");
  } catch {
    // Nothing to remember it in; trackingAllowed() already treats that as out.
  }
}
