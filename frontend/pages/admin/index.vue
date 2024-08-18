<template>
  <h1 class="h1 admin">Dashboard</h1>
  <AdminSelectPeriod
    v-model="selectPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  />
  <AdminDashboardTable :data="data" />
  <!-- <AdminPagination currentPage="2" limit="8" totalCountData="40" /> -->
</template>

<script setup>
const options = [
  {
    id: 7,
    name: "7 days",
  },
  {
    id: 30,
    name: "30 days",
  },
];

const selectPeriod = ref(options[0]);

const { filters } = useFilter({
  initialFilters: {
    limit: selectPeriod.value.id,
  },
});

const { data } = await useApi({
  name: "statisticsDay.getAll",
  filters,
  params: {
    sort: "date",
  },
  init: true,
});

watch(
  () => selectPeriod.value,
  (newV) => {
    filters.value.limit = newV.id;
  }
);

definePageMeta({
  layout: "admin",
});
</script>
