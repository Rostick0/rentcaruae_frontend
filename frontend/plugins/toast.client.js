/*
  Плагин toast
  Пример использования: const { $toast } = useNuxtApp();
*/

import Toast, { useToast } from "vue-toastification";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast);

  return {
    provide: {
      toast: useToast(),
    },
  };
});
