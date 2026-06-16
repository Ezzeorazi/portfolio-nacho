// Hoja de estilo XSL para el sitemap. Se sirve con Content-Type text/xsl para
// que los navegadores la apliquen y muestren el sitemap como una tabla con la
// estética del sitio. No afecta cómo lo leen los buscadores.
export const dynamic = 'force-static'

const XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap · Nacho Rodriguez</title>
        <style>
          *{box-sizing:border-box;}
          body{margin:0;background:#1A1A1A;color:#F4F1EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}
          .wrap{max-width:1040px;margin:0 auto;padding:48px 20px;}
          header{border-bottom:1px solid rgba(181,154,93,.3);padding-bottom:24px;margin-bottom:28px;}
          .kicker{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#B59A5D;margin:0 0 10px;}
          h1{font-size:30px;margin:0 0 8px;font-weight:600;}
          .count{color:#DFD6BC;font-size:14px;margin:0;}
          table{width:100%;border-collapse:collapse;font-size:14px;}
          th{text-align:left;color:#B59A5D;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:12px 10px;border-bottom:1px solid rgba(181,154,93,.35);}
          td{padding:11px 10px;border-bottom:1px solid rgba(255,255,255,.06);vertical-align:top;}
          tr:hover td{background:rgba(181,154,93,.07);}
          a{color:#F4F1EA;text-decoration:none;}
          a:hover{color:#B59A5D;text-decoration:underline;}
          .lang{display:inline-block;font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:#DFD6BC;border:1px solid rgba(181,154,93,.35);border-radius:3px;padding:1px 6px;margin:0 4px 2px 0;}
          .muted{color:#DFD6BC;white-space:nowrap;}
          footer{margin-top:32px;color:rgba(223,214,188,.45);font-size:12px;}
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <p class="kicker">Nacho Rodriguez · Riviera Maya</p>
            <h1>Mapa del sitio</h1>
            <p class="count">
              <xsl:value-of select="count(s:urlset/s:url)"/> URLs · archivo para buscadores (Google lo lee automáticamente)
            </p>
          </header>
          <table>
            <tr>
              <th>URL</th>
              <th>Idiomas</th>
              <th>Modificado</th>
              <th>Prioridad</th>
            </tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td>
                  <xsl:for-each select="xhtml:link">
                    <span class="lang"><xsl:value-of select="@hreflang"/></span>
                  </xsl:for-each>
                </td>
                <td class="muted"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
                <td class="muted"><xsl:value-of select="s:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
          <footer>nachorodriguezmusic.com — sitemap.xml</footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`

export async function GET() {
  return new Response(XSL, {
    headers: { 'Content-Type': 'text/xsl; charset=utf-8' },
  })
}
