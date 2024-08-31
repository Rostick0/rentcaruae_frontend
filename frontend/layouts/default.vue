<template>
  <div class="wrapper">
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
await useCategory();
await useBrand();
await useGeneration();
useRentalPeriod();
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
}
</style>
