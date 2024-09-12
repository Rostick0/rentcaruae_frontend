<template>
  <div class="error-page">
    <h2 class="tit le">Error: 404</h2>
    <div class="error-page__content">
      <div class="">Page not found</div>
    </div>
    <NuxtLink to="/">
      <UiButton>Go main</UiButton>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/pages/error";
</style>
