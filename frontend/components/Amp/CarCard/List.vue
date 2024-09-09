<template>
  <div class="cars">
    <AmpCarCardItem
      v-for="car in cars"
      :key="car?.id"
      :car="car"
      :isLeasing="isLeasing"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  cars: Array,
  isLeasing: Boolean,
});
</script>

<style lang="scss" scoped>
.cars {
  display: grid;
  grid-template-columns: 2fr;
  grid-gap: 20px 24px;

  @media (max-width: 680px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
