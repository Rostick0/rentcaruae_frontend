<template>
  <h1 class="h1 seller">Dashboard</h1>
  <SellerSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  />
  <SellerDashboardTable :data="data" />
  <!-- <AnyPagination currentPage="2" limit="8" totalCountData="40" /> -->
</template>

<script setup>
import moment from "moment";

const options = [
  {
    id: moment().subtract(7, "d").format("YYYY-MM-DD"),
    name: "7 days",
    limit: 7,
  },
  {
    id: moment().subtract(30, "d").format("YYYY-MM-DD"),
    name: "30 days",
    limit: 30,
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
    is_full_data: true,
    sort: "date",
    limit: 7,
  },
  init: true,
});

watch(
  () => selectedPeriod.value,
  (newV) => {
    filters.value["filterGEQ[date]"] = newV.id;
    filters.value.limit = newV.limit;
  }
);

definePageMeta({
  layout: "seller",
});
</script>
