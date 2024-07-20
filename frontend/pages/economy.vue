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
    name: "Economy Car Rental",
  },
]);
const h1 = ref("Economy cars for rent in Dubai");
</script>
