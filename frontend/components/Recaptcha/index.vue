<template>
  <input v-model="value" type="hidden" />
  <!-- <button @click.prevent="recaptcha">Execute recaptcha</button> -->
</template>

<script setup>
// import { useReCaptcha } from "vue-recaptcha-v3";
import { useReCaptcha, VueReCaptcha } from "vue-recaptcha-v3";
// import { VueReCaptcha } from "vue-recaptcha-v3";

const config = useRuntimeConfig();

const nuxt = useNuxtApp();
nuxt.vueApp.use(VueReCaptcha, {
  siteKey: config.public.NOCAPTCHA_SITEKEY,
  loaderOptions: {
    autoHideBadge: true,
    useRecaptchaNet: true,
  },
});

const { recaptchaLoaded, executeRecaptcha } = useReCaptcha();

const props = defineProps({
  modelValue: String,
  action: {
    type: String,
    default: "operation",
  },
});

const emit = defineEmits(["update:modelValue"]);

const recaptcha = async () => {
  await recaptchaLoaded();

  const token = await executeRecaptcha(props.action);

  emit("update:modelValue", token);
};

recaptcha();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(
  () => value.value,
  (newV) => {
    if (newV) return;

    recaptcha();
  }
);
</script>
