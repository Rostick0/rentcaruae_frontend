// import type { NuxtConfig } from "@nuxt/types";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  typescript: {
    shim: false,
  },
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
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  css: ["~/assets/scss/index.scss"],

  modules: ["nuxt-lazy-hydrate", "@nuxt/image"],

  build: {
    transpile: ["@vuepic/vue-datepicker", "vue-toastification"],
  },

  // routeRules: {
  //   "/admin": {
  //     layout: "admin",
  //   },
  // },
  nitro: {
    compressPublicAssets: true,
  },
});
