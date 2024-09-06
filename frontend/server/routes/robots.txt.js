export default defineEventHandler(async (e) => {
  e.node.res.setHeader("content-type", "text/plain");

  const config = useRuntimeConfig(e);

  return `User-agent: *

Allow: /
Disallow: /api
Disallow: /admin
Disallow: /seller
Disallow: /privacy_policy
Disallow: /terms_of_service

Disallow: /*?*
Disallow: /*%
Disallow: /index.php
Disallow: /*?page=
Disallow: /*&page=

Host: ${config.public.HOST}
Sitemap: ${config.public.HOST}/sitemap.xml`;
});
