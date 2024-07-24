<template>
  <PageCatalog :breadcrumbs="breadcrumbs" :h1="h1" />
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
    name: "Car leasing in Dubai ",
  },
]);
const h1 = ref("Car leasing in Dubai");
</script>
