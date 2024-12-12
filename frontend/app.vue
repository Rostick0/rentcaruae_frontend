<template>
  <NuxtLayout>
    <!-- {{ $t("form.email", 0) }}
    <br />
    {{ $t("form.email", 1) }}
    <br />
    {{ $t("form.email") }}
    <br /> -->
    <NuxtPage />
  </NuxtLayout>
  <LazyModalPWA v-if="$device.isIos && !$pwa?.isPWAInstalled" />
  <VitePwaManifest />
</template>

<script setup>
const { configure, defineRule } = await import("vee-validate");
const { email, min, max, required, size, image, min_value, max_value } =
  await import("@vee-validate/rules");
const { localize } = await import("@vee-validate/i18n");

await import("vue-toastification/dist/index.css");

const route = useRoute();

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("size", size);
defineRule("image", image);
defineRule("min_value", min_value);
defineRule("max_value", max_value);

const { t, locale } = useI18n();

configure({
  generateMessage: localize(locale.value, getMessagesValidate(t)),
});

watch(
  () => locale.value,
  () => {
    configure({
      generateMessage: localize(locale.value, getMessagesValidate(t)),
    });
  }
);

const { accessToken, user, getUser } = await useAuth();
if (accessToken.value && !user.value) {
  await getUser();
}

await useExchangeRate({
  isInit: true,
});

const { cities, currentCity } = await useCity();

if (route.params?.city) {
  currentCity.value = cities.value?.find(
    (item) =>
      item?.name?.replace(" ", "_")?.toLowerCase() === route.params?.city
  );
}
</script>
