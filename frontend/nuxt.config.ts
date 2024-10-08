// import type { NuxtConfig } from "@nuxt/types";

// https://nuxt.com/docs/api/configuration/nuxt-config
const appleTouchFavicons = [
  "57x57",
  "60x60",
  "72x72",
  "76x76",
  "114x114",
  "120x120",
  "144x144",
  "152x152",
  "180x180",
].map((item) => ({
  rel: "apple-touch-icon",
  sizes: item,
  href: `/favicons/favicon-${item}.png`,
}));

const imageFavicons = ["16x16", "32x32", "96x96", "192x192"].map((item) => ({
  rel: "icon",
  type: "image/png",
  sizes: item,
  href: `/favicons/favicon-${item}.png`,
}));

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  typescript: {
    shim: false,
  },
  site: { trailingSlash: true },
  pages: true,
  app: {
    head: {
      htmlAttrs: {
        lang: "en-US",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "google-site-verification",
          content: "nAke3KR5w3tRblpZKDBupgSzbRCQFQqZUWSL8HmxjdU",
        },
        {
          name: "yandex-verification",
          content: "a29ffcb48fde9792",
        },
        {
          name: "mailru-domain",
          content: "zMFprLNRSMsFJbhB",
        },
      ],
      link: [
        ...appleTouchFavicons,
        ...imageFavicons,
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicons/favicon.ico",
        },
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/favicons/favicon.ico",
        },
        {
          rel: "manifest",
          href: "/favicons/manifest.json",
        },
      ],
    },
  },
  css: ["~/assets/scss/index.scss"],

  modules: [
    "nuxt-lazy-hydrate",
    "@nuxt/image",
    "@nuxtjs/device",
    "@vite-pwa/nuxt",
    "nuxt-lazy-load",
    "@nuxtjs/seo",
  ],

  build: {
    transpile: ["@vuepic/vue-datepicker", "vue-toastification"],
  },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_URL: process.env.API_URL,
      BACK_URL: process.env.BACK_URL,
      NOCAPTCHA_SITEKEY: process.env.NOCAPTCHA_SITEKEY,
    },
  },

  pwa: {
    workbox: {
      navigateFallback: "/",
      importScripts: [
        "https://push4site.com/static/sw/rentcaruae.js",
        "/sw-offline.js",
      ],
      runtimeCaching: [
        {
          urlPattern: "/",
          handler: "NetworkFirst",
          method: "GET",
        },
      ],
    },

    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  lazyLoad: {
    directiveOnly: true,
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: any) => ["amp-img", "amp-carousel"].includes(tag),
    },
  },

  router: {
    options: {
      strict: true,
    },
  },

  target: "server",
  modern: "server",
  routeRules: {
    "/404": {
      static: true,
    },
    "/privacy_policy": {
      static: true,
    },
    "/terms_of_service": {
      static: true,
    },
    "/sitemap": {
      static: true,
    },
    "/amp": {
      ssr: true,
      experimentalNoScripts: true,
    },
    "/amp/**": {
      ssr: true,
      experimentalNoScripts: true,
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
});
