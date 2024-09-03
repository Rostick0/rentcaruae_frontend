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
  site: { indexable: false },
  pages: true,
  app: {
    head: {
      title: "Car",
      htmlAttrs: {
        lang: "en-US",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
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
    "nuxt-swiper",
    "@nuxtjs/device",
  ],
  swiper: {
    modules: ["pagination"],
    styleLang: "css",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker", "vue-toastification"],
  },

  runtimeConfig: {
    public: {
      HOST: process.env.HOST,
      API_URL: `${process.env.API_URL}`,
      BACK_URL: `${process.env.BACK_URL}`,
    },
  },

  pwa: {
    // manifest: {
    //   name: "Rent Car UAE",
    //   short_name: "RentCarUAE",
    //   description: "Rent Car UAE",
    //   theme_color: "white",
    //   lang: "en-US",
    //   icons: [
    //     {
    //       src: "icons/maskable_icon_x48.png",
    //       sizes: "48x48",
    //       type: "image/png",
    //       purpose: "maskable",
    //     },
    //     {
    //       src: "icons/maskable_icon_x72.png",
    //       sizes: "72x72",
    //       type: "image/png",
    //       purpose: "maskable",
    //     },
    //     {
    //       src: "icons/maskable_icon_x96.png",
    //       sizes: "96x96",
    //       type: "image/png",
    //       purpose: "maskable",
    //     },
    //     {
    //       src: "icons/maskable_icon_x128.png",
    //       sizes: "128x128",
    //       type: "image/png",
    //       purpose: "maskable",
    //     },
    //     {
    //       src: "icons/maskable_icon_x192.png",
    //       sizes: "192x192",
    //       type: "image/png",
    //       purpose: "maskable",
    //     },
    //     {
    //       src: "icons/maskable_icon_x512.png",
    //       sizes: "512x512",
    //       type: "image/png",
    //       purpose: "maskable",
    //     },
    //   ],
    // },
    // workbox: {
    //   navigateFallback: "/",
    //   importScripts: ["https://push4site.com/static/sw/buycardubai.js"],
    // },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },

  routeRules: {
    "/amp": {
      ssr: true,
      experimentalNoScripts: true,
      // render: {
      //   spaScript: false,
      // },
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
});
