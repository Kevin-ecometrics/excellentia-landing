export type SitemapRoute = {
  path: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: string;
};

// Public, indexable pages only — excludes /_not-found and any
// private, admin, auth, or utility routes.
export const sitemapRoutes: SitemapRoute[] = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/privacy-policy/", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-and-conditions/", changefreq: "yearly", priority: "0.3" },
  {
    path: "/End-User-Licensing-Agreement/",
    changefreq: "yearly",
    priority: "0.3",
  },
];
