<template>
  <h1 class="h1 admin">Leads</h1>
  <AdminSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  />
  <AdminLeadsTable :cars="data" />
  <AdminPagination currentPage="1" limit="8" totalCountData="40" />
</template>

<script setup>
const options = [
  {
    id: 1,
    name: "1 day",
  },
  {
    id: 2,
    name: "7 days",
  },
  {
    id: 3,
    name: "30 days",
  },
];

const selectedPeriod = ref(options[0]);

const pagination = ref();

const data = [...new Array(8)].map((_, i) => ({
  id: i + 1,
  brand: {
    name: "Ferrari",
  },
  model: {
    name: "F8 Tributo Spyder",
  },
  user: {
    name: "Leonel Messi",
    email: "Messi@gmail.com",
    tel: "+971 553 231 32 32",
  },
  rental: "11",
  price: 36289,
  created_at: "2023-07-16",
}));

definePageMeta({
  layout: "admin",
});
</script>
