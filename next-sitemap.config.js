/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nachorodriguezmusic.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  alternateRefs: [
    { href: 'https://nachorodriguezmusic.com/es', hreflang: 'es' },
    { href: 'https://nachorodriguezmusic.com/en', hreflang: 'en' },
  ],
}
