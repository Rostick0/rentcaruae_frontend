<template>
  <AmpCarCardInfo :car="car" />
  <CarSpecifications
    v-if="specifications"
    :specifications="specifications"
    :car="car"
  />
  <AmpCarDescription v-if="car?.description" :car="car" />
  <CarRentalPricing :car="car" :isLeasing="isLeasing" />
</template>

<script setup>
const props = defineProps({
  car: Object,
  specifications: Array,
  isLeasing: Boolean,
});
</script>
