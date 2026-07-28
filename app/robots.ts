import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/app/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Backend endpoints (Express server) — not public content.
      disallow: ["/send-email", "/smtp-check"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
