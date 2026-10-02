"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist, type ActionState } from "@/actions";
import { useActionState } from "react";

// Minimal fbqTrack fallback to avoid a missing-module build error.
// If the Meta Pixel script is present on the page it will call fbq('track', ...),
// otherwise this is a safe no-op.
function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const anyWin = window as Window & {
    fbq?: (cmd: string, event: string, params?: Record<string, unknown>) => void;
  };
  if (typeof anyWin.fbq === "function") {
    try {
      anyWin.fbq("track", event, params);
    } catch {
      // ignore errors from third-party script
    }
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => fbqTrack('Lead', { value: 0, currency: 'USD' })}
      className="rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-soft hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Joining…" : "Join the app waitlist"}
    </button>
  );
}

const initialState: ActionState = {
  ok: false,
  message: undefined,
  fieldErrors: undefined,
};

export default function WaitlistForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    joinWaitlist,
    initialState
  );

  const [selectedPetType, setSelectedPetType] = React.useState("Choose one");

  return (
    <section id="waitlist" className="py-12">
      <div className="mx-auto grid max-w-content gap-8 px-4 md:grid-cols-2">
        {/* Left: form */}
        <div>
          <h2 className="text-3xl font-bold">Join PetSwap Early</h2>
          <p className="mt-2 text-muted">
            <strong>Early-bird bonus:</strong> The first 1,000 people on the app
            waitlist get <strong>500 points</strong> at launch.
          </p>

          <form action={formAction} className="mt-6 grid max-w-lg gap-4">
            {/* Honeypot & metadata */}
            {/*
              A name no browser autofills. It was "website", which a browser or
              password manager can fill for a real person, and that person was
              then refused or silently dropped (#225, 2 October).
            */}
            <input
              type="text"
              name="pswp_leave_empty"
              tabIndex={-1}
              autoComplete="one-time-code"
              aria-hidden="true"
              className="hidden"
            />
            <input
              type="hidden"
              name="userAgent"
              value={
                typeof navigator !== "undefined" ? navigator.userAgent : ""
              }
            />

            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Full name
              </label>
              <input
                id="name"
                name="name"
                placeholder=""
                required
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
              />
              {state.fieldErrors?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {state.fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder=""
                required
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
              />
              {state.fieldErrors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-[1fr,120px] gap-4">
              <div>
                <label htmlFor="city" className="text-sm font-semibold">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  placeholder=""
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
                />
                {state.fieldErrors?.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.fieldErrors.city}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  placeholder=""
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
                />
                {state.fieldErrors?.state && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.fieldErrors.state}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="zip" className="text-sm font-semibold">
                  Zip
                </label>
                <input
                  id="zip"
                  name="zip"
                  placeholder=""
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
                />
                {state.fieldErrors?.zip && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.fieldErrors.zip}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="petType" className="text-sm font-semibold">
                Pet type
              </label>
              <div className="flex gap-1 items-center">
                <div className="flex-1">
                  <select
                    id="petType"
                    name="petType"
                    required
                    value={selectedPetType}
                    onChange={(e) => setSelectedPetType(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
                  >
                    <option value="Choose one" disabled>
                      Choose one
                    </option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Other">Other</option>
                  </select>
                  {state.fieldErrors?.pettype && (
                    <p className="mt-1 text-sm text-red-600">
                      {state.fieldErrors.pettype}
                    </p>
                  )}
                </div>
                {selectedPetType === "Other" && (
                  <div className="flex-1">
                    <input
                      id="other"
                      name="other"
                      placeholder="enter other pet type"
                      required
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
                    />
                    {state.fieldErrors?.other && (
                      <p className="mt-1 text-sm text-red-600">
                        {state.fieldErrors.other}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="referral" className="text-sm font-semibold">
                How did you hear about us? (optional)
              </label>
              <input
                id="referral"
                name="referral"
                placeholder="Nextdoor, friend, IG…"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-3"
              />
            </div>

            <SubmitButton />

            {/* Global message area */}
            {state.message && (
              <p
                className={`mt-2 text-sm ${
                  state.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            )}

            <small className="mt-1 block text-xs text-muted">
              Offer limited to first 1,000 valid signups. Points credited at
              launch after ID verification. One per person. No cash value.
            </small>
          </form>
        </div>

        {/* Right column (Why PetSwap?) stays as you already have it */}
      </div>
    </section>
  );
}
