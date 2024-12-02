<template>
  <div class="error-page">
    <h2 class="tit le">{{ $t("error") }}: 404</h2>
    <div class="error-page__content">
      <div class="">{{ $t("pageNotFound") }}</div>
    </div>
    <NuxtLink to="/">
      <UiButton>{{ $t("goMain") }}</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
if (process.server) {
  const event = useRequestEvent();
  setResponseStatus(event, 404);
}
</script>

<style lang="scss" scoped>
@forward "./../assets/scss/pages/error";
</style>
