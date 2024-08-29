<template>
  <div class="cars">
    <LazyCarCardItem v-for="car in cars" :key="car?.id" :car="car" />
  </div>
</template>

<script setup>
const props = defineProps({
  cars: Array,
});
</script>

<style lang="scss" scoped>
.cars {
  display: grid;
  // grid-template-columns: repeat(auto-fit, 360px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
