<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="robots" content="noindex"/>
        <title>XML Sitemap — Excellentia Foods</title>
        <style type="text/css">
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 40px 24px;
            background: #f9efe8;
            color: #023334;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          }
          .wrap { max-width: 960px; margin: 0 auto; }
          h1 { font-size: 1.5rem; margin: 0 0 4px; }
          p.meta { color: #4b5a5a; margin: 0 0 24px; font-size: 0.95rem; }
          .count { font-weight: 700; color: #023334; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          }
          th, td {
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
            font-size: 0.9rem;
            vertical-align: top;
          }
          th {
            background: #023334;
            color: #f9efe8;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            font-size: 0.75rem;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #fdf6f0; }
          a { color: #023334; text-decoration: none; font-weight: 600; word-break: break-all; }
          a:hover { text-decoration: underline; }
          footer { margin-top: 24px; font-size: 0.8rem; color: #8a8a8a; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>XML Sitemap</h1>
          <p class="meta">
            This sitemap is generated automatically for search engines and contains
            <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
            URL(s). It is not meant for human browsing, but here it is anyway.
          </p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <footer>Excellentia Foods LLC</footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
