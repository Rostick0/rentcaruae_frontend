<template>
  <input v-model="value" type="hidden" />
  <button @click.prevent="recaptcha">Execute recaptcha</button>
</template>

<script setup>
import { useReCaptcha } from "vue-recaptcha-v3";

const { recaptchaLoaded, executeRecaptcha } = useReCaptcha();

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await executeRecaptcha("yourActionHere");

  emit("update:modelValue", token);
  // return token;
};

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
