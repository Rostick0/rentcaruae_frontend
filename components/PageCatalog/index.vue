<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1">{{ h1 }}</h1>
      <CarType v-model="type" />
      <Filter />
      <CarCardList :cars="cars" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  h1: String,
  breadcrumbs: Array,
});

const type = ref();

const cars = [
  {
    id: 2,
    title: "BMW 430i cabrio",
    price_daily_old: 3600,
    price_daily: 3499,
    price_month_old: 80000,
    price_month: 60000,
    deposite: null,
    min_days: 1,
    mileage_day: 250,
    mileage_month: 2400,
    gearbox: "auto",
    persons: 4,
    fuel_type: "petrol",
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (1).png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (3).png",
    },
    user: {
      name: "",
      path: 'images/fake/thrifty-car-rental-lg.png 1.png'
    },
    options: ["NEW", "Special offer"],
    modules: ["1 day rental available", "Insurance included", "Free delivery"],
  },
];
</script>

<style lang="scss" scoped>
.catalog {
}
</style>
