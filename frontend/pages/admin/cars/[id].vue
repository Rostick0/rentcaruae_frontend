<template>
  <h1 class="h1 admin">Edit car</h1>
  <AdminCarForm :car="data" />
  <!-- {{ data }} -->
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const id = useRoute().params.id;

// const { data } = await api.car.get({ id });
const { data } = await useApi({
  name: "car.get",
  init: true,
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,security_deposit,price_special,car_options.option",
  },
  requestParams: {
    id,
  },
});

// console.log(data.value);
</script>
