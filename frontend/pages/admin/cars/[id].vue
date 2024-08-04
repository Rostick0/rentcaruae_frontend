<template>
  <h1 class="h1 admin">Edit car</h1>
  <AdminCarForm :car="data" />
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "car.get",
  params: {
    extends: [
      "generation.model_car.brand",
      "car_options.option",
      "images.image",
      "category",
      "fuel_type",
      "security_deposit",
      "transmission",
      "colour",
      "colour_interior",
      "price",
      "price_leasing",
      "price_special",
    ].join(),
  },
  requestParams: {
    id,
  },
});

await get();

// console.log(data.value);
</script>
