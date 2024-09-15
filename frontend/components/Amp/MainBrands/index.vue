<template>
  <div class="brands">
    <div class="brands__top">
      <h2 class="brands__title">Most wanted car brands in Dubai</h2>
      <LinkMore name="All brands" to="/" />
    </div>
    <AmpBrands :brands="brands" />
  </div>
</template>

<script setup>
const data = useState("brands");

const config = useRuntimeConfig();

const brands = computed(() => data.value?.slice?.(0, 12));
</script>

<style lang="scss" scoped>
.brands {
  margin-bottom: 40px;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    margin-bottom: 14px;
  }

  // &__more {
  //   display: flex;
  //   align-items: center;
  //   column-gap: 4px;
  // }
}
</style>
