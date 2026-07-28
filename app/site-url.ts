const PRODUCTION_URL = "https://excellentiafoods.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL
).replace(/\/$/, "");

export const isProduction = siteUrl === PRODUCTION_URL;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}
