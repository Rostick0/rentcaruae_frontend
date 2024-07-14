<template>
  <div class="container">
    <MainBanner />
    <MainBrands />
    <CarShortList
      :cars="cars"
      title="Special offers"
      linkText="All special offers"
      link="/"
    />
    <CarShortList
      :cars="cars"
      title="Luxury cars"
      linkText="All Luxury cars"
      link="/"
    />
    <CarShortList
      :cars="cars"
      title="SUV for rent"
      linkText="All SUV"
      link="/"
    />
  </div>
</template>

<script setup>
const cars = [
  {
    id: 1,
    title: "Ferrari F8 Tributo Spyder",
    price_old: 800,
    price: 699,
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1.png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (2).png",
    },
  },
  {
    id: 2,
    title: "BMW 430i cabrio",
    price_old: 800,
    price: 499,
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (1).png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (3).png",
    },
  },
  {
    id: 3,
    title: "Rolls Royce Cullinan",
    price_old: 800,
    price: 599,
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (2).png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (4).png",
    },
  },
];
</script>
