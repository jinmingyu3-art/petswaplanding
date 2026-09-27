"use client";

import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { trackingAllowed } from "./privacyChoice";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!;

// Types (no `any`)
type FbqMethods = "init" | "track" | "trackCustom";
type FbqFunction = {
  (
    method: FbqMethods,
    eventOrId: string,
    params?: Record<string, unknown>
  ): void;
  queue?: unknown[];
  push?: FbqFunction;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  // Decided in the browser after it loads, because the server cannot see GPC
  // or the visitor's choice. Nothing loads until then.
  const [allowed, setAllowed] = useState(false);
  useEffect(() => setAllowed(trackingAllowed()), []);
  if (!PIXEL_ID || !allowed) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
          n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
          n.queue=[]; t=b.createElement(e); t.async=!0;
          t.src=v; s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${PIXEL_ID}');
          fbq('track','PageView');
        `}
      </Script>

      {/* No <noscript> image: it fired for every visitor with scripts off,
          whatever they had chosen, so it could not respect an opt-out. */}

      {/* This satisfies the lint rule everywhere, including /404 */}
      <Suspense fallback={null}>
        <MetaPixelRouteTracker />
      </Suspense>
    </>
  );
}

export function fbqTrack(
  event: "PageView" | "Lead" | "Purchase" | "AddToCart" | string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}
