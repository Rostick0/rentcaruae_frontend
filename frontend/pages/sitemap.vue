<template>
  <div class="container">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1 class="h1">Sitemap</h1>
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Sitemap",
  },
];

useHead({
  title: `Sitemap - Rent a Car ${currentCity.value?.name}`,
});
</script>
