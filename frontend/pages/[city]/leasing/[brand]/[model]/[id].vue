<template>
  <PageCar :breadcrumbs="breadcrumbs" />
</template>

<script setup>
const breadcrumbs = ref([
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Dubai",
    link: "/",
  },
  {
    name: "Car leasing",
  },
]);
</script>
