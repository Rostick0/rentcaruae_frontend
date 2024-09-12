import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin({
  parallel: true,
  async setupnuxtApp() {
    nuxtApp.vueApp.use(VueReCaptcha, {
      siteKey: "6LdaxTcqAAAAAD0gyacqOi5F7Ga6CTB44ZDI0MIg",
    });
  },
});
