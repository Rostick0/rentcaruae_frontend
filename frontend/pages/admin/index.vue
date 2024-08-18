<template>
  <h1 class="h1 admin">Dashboard</h1>
  <AdminSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  />
  <AdminDashboardTable :data="data" />
  <!-- <AdminPagination currentPage="2" limit="8" totalCountData="40" /> -->
</template>

<script setup>
import moment from "moment";

const options = [
  {
    id: moment().subtract(7, "d").format("YYYY-MM-DD"),
    name: "7 days",
  },
  {
    id: moment().subtract(30, "d").format("YYYY-MM-DD"),
    name: "30 days",
  },
];

const selectedPeriod = ref(options[0]);

const { filters } = useFilter({
  initialFilters: {
    "filterGEQ[date]": selectedPeriod.value.id,
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
  () => selectedPeriod.value,
  (newV) => {
    filters.value["filterGEQ[date]"] = newV.id;
  }
);

definePageMeta({
  layout: "admin",
});
</script>
