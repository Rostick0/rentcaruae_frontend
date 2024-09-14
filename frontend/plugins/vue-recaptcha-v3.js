import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: config.public.NOCAPTCHA_SITEKEY,
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true,
    },
  });
});
