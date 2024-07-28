<template>
  <h1 class="h1 admin">Dashboard</h1>
  <AdminSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  />
  <AdminDashboardTable :cars="data" />
  <!-- <AdminPagination currentPage="2" limit="8" totalCountData="40" /> -->
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

const data = [...new Array(8)].map((_, i) => ({
  id: i + 1,
  brand: "Ferrari",
  model: "F8 Tributo Spyder",
  refreshes: 25,
  special_offers: 2,
  total_views: 720,
  booking: 7,
  whatsapp: 7,
  price_daily: 499,
  created_at: "2023-07-16",
}));

definePageMeta({
  layout: "admin",
});
</script>
