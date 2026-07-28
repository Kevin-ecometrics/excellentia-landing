import { sitemapRoutes } from "@/app/sitemap-routes";
import { siteUrl } from "@/app/site-url";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;");
}

export function GET() {
  const lastmod = new Date().toISOString();

  const urls = sitemapRoutes
    .map(
      (route) => `  <url>
    <loc>${escapeXml(siteUrl + route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
