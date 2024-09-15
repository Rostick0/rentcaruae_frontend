/*
  Плагин toast
  Пример использования: const { $toast } = useNuxtApp();
*/

import Toast, { useToast } from "vue-toastification";
await import("vue-toastification/dist/index.css");
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast);

  return {
    provide: {
      toast: useToast(),
    },
  };
});
