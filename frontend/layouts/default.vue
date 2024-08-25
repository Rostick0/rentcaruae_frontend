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
const { categories } = await useCategory();
const { brands } = await useBrand();
const { generations } = await useGeneration();
const { rentalPeriods } = useRentalPeriod();
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
}
</style>
