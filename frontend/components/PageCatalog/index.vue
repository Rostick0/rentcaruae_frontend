<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1" v-if="h1">{{ h1 }}</h1>
      <slot name="topBlock" />
      <CarType v-model="type" />
      <LazyFilter />
      <LazyCarCardList :cars="data" />
      <LazyCarCardShortList
        class="catalog__specials"
        v-if="carsSec?.length > 1"
        :cars="carsSec"
        title="Special offers"
        linkText="All special offers"
        link="/"
      />
      <!-- <LazyCarCardList :cars="[...cars].splice(0, 3)" /> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  h1: String,
  breadcrumbs: Array,
});

const type = ref();

const { data, get } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special",
    sort: "-id",
  },
});

await get();

const { data: carsSec, get: getCarsSec } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special",
    sort: "-id",
    "filterNotIN[id]": data.value?.map((item) => item?.id)?.join(),
  },
});

await getCarsSec();

// const cars = [1, 2, 3, 4, 5, 6].map((item) => ({
//   id: 2,
//   title: "BMW 430i cabrio",
//   price_daily_old: 3600,
//   price_daily: 3499,
//   price_month_old: 80000,
//   price_month: 60000,
//   deposite: null,
//   min_days: 1,
//   mileage_day: 250,
//   mileage_month: 2400,
//   gearbox: "auto",
//   persons: 4,
//   fuel_type: "petrol",
//   image: {
//     path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (1).png",
//   },
//   make: {
//     name: "",
//     path: "images/fake/Logos (3).png",
//   },
//   user: {
//     name: "",
//     path: "images/fake/thrifty-car-rental-lg.png 1.png",
//   },
//   options: ["NEW", "Special offer"],
//   modules: ["1 day rental available", "Insurance included", "Free delivery"],
// }));

// const carsSec = [
//   {
//     id: 1,
//     title: "Ferrari F8 Tributo Spyder",
//     price_old: 800,
//     price: 699,
//     image: {
//       path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1.png",
//     },
//     make: {
//       name: "",
//       path: "images/fake/Logos (2).png",
//     },
//   },
//   {
//     id: 2,
//     title: "BMW 430i cabrio",
//     price_old: 800,
//     price: 499,
//     image: {
//       path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (1).png",
//     },
//     make: {
//       name: "",
//       path: "images/fake/Logos (3).png",
//     },
//   },
//   {
//     id: 3,
//     title: "Rolls Royce Cullinan",
//     price_old: 800,
//     price: 599,
//     image: {
//       path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (2).png",
//     },
//     make: {
//       name: "",
//       path: "images/fake/Logos (4).png",
//     },
//   },
// ];
</script>

<style lang="scss" scoped>
.catalog {
  &__specials {
    margin: 20px 0 40px;
  }
}
</style>
