"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True after hydration, false during server rendering.
 *
 * Used to defer rendering values that are genuinely unknown on the server
 * (such as the resolved colour theme) without calling setState from an effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
