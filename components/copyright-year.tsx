import { cacheLife } from "next/cache";

/**
 * `new Date()` is request-time data under Cache Components, so the year is
 * resolved inside a cached scope instead of during the layout render.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("max");

  return <>{new Date().getFullYear()}</>;
}
