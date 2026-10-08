"use client";

import { useActionState } from "react";
import { unsubscribe, type UnsubscribeState } from "./actions";

export default function UnsubscribeForm({ m, s, env }: { m: string; s: string; env: string }) {
  const [state, action, pending] = useActionState<UnsubscribeState, FormData>(unsubscribe, null);

  if (state?.done) {
    return <p className="mt-6 text-lg leading-relaxed" role="status">{state.message}</p>;
  }
  return (
    <form action={action} className="mt-6">
      <input type="hidden" name="m" value={m} />
      <input type="hidden" name="s" value={s} />
      <input type="hidden" name="env" value={env} />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand px-5 py-3 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Unsubscribing…" : "Unsubscribe from reminder emails"}
      </button>
      {state && !state.done ? (
        <p className="mt-4 leading-relaxed text-red-700" role="alert">{state.message}</p>
      ) : null}
    </form>
  );
}
