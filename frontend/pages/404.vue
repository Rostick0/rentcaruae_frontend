<template>
  <div class="error-page">
    <h2 class="tit le">{{ $t("404.error") }}: 404</h2>
    <div class="error-page__content">
      <div class="">{{ $t("404.pageNotFound") }}</div>
    </div>
    <NuxtLink to="/">
      <UiButton>{{ $t("404.goMain") }}</UiButton>
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
