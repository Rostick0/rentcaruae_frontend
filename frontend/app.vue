<template>
  <div v-if="$pwa.offlineReady">123</div>
  <div v-if="$pwa.needRefresh">1234</div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- <NoInternet v-if="$pwa?.needRefresh" /> -->
  <LazyModalPWA v-if="$device.isIos && !$pwa?.isPWAInstalled" />
  <VitePwaManifest />
</template>

<script setup>
const { configure, defineRule } = await import("vee-validate");
const { email, min, max, required, size, image, min_value, max_value } =
  await import("@vee-validate/rules");
const { localize } = await import("@vee-validate/i18n");
await import("vue-toastification/dist/index.css");

const isOffline = ref(false);

onMounted(() => {
  window.addEventListener("offline", (e) => {
    //displays an error when the browser is not connected to the internet
    showError({
      message: "⚠️ You are not connected to the internet!",
      statusCode: 503,
    });
  });
});
// const { $pwa } = useNuxtApp();

// onMounted(() => {
//   if ($pwa.offlineReady) success("App ready to work offline");
// });

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("size", size);
defineRule("image", image);
defineRule("min_value", min_value);
defineRule("max_value", max_value);

configure({
  // create and set a localization handler
  generateMessage: localize("en", {
    messages: {
      // interpolates the field name
      required: "The {field} field is required",
      email: "The {field} must be a valid email address",
      // interpolates the min, max params
      between: "The {field} value must be between 0:{min}, 1:{max}",
      // interpolates the min, max params
      min: "The {field} must be at least 0:{min} characters",
      max: "The {field} must not be greater than 0:{max} characters",
      // Interpolates another field value in the form
      confirmed: "The {field} value must match {age}",
      size: "The {field} size must be less than {size} KB",
      image: "The {field} field must be an image",
      min_value: "The {field} must be greater than or equal to 0:{min}",
      max_value: "The {field} must be less than 0:{max_value}",
    },
  }),
});

const { accessToken, user, getUser } = await useAuth();
if (accessToken.value && !user.value) {
  await getUser();
}

await useCity();
</script>
