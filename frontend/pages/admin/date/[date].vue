<template>
  <h1 class="h1 admin">Dashboard</h1>
  <AdminSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date"
    :titleRight="moment(route?.params?.date).format('DD MMM YYYY')"
    subtitle="Show cars:"
  />
  <AdminDashboardTableDate :data="data" />
  <AdminPagination
    :currentPage="meta?.current_page"
    :limit="selectedPeriod.id"
    :totalCountData="meta?.total"
  />
</template>

<script setup>
import moment from "moment";

const options = [
  {
    id: 10,
    name: "10",
  },
  {
    id: 25,
    name: "25",
  },

  {
    id: 50,
    name: "50",
  },
];

const selectedPeriod = ref(options[0]);

const route = useRoute();

const { filters } = useFilter({
  initialFilters: {
    "filterEQ[date]": route.params?.date,
    limit: selectedPeriod.value.id,
  },
});

const { data, meta } = await useApi({
  name: "statisticsDay.getAll",
  filters,
  params: {
    extends: "car.generation.model_car.brand",
    car_group: true,
    sort: "car.id",
  },
  init: true,
});

watch(
  () => selectedPeriod.value,
  (newV) => {
    filters.value["limit"] = newV.id;
  }
);

definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss" scoped></style>
