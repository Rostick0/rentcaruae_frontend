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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 24px;
}
</style>
