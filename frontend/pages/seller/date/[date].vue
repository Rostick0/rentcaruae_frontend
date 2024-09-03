<template>
  <h1 class="h1 seller">Dashboard</h1>
  <SellerSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date"
    :titleRight="moment(route?.params?.date).format('DD MMM YYYY')"
    subtitle="Show cars:"
  />
  <SellerDashboardTableDate :data="data" />
  <SellerPagination
    :currentPage="meta?.current_page"
    :limit="selectedPeriod.id"
    :totalCountData="meta?.total"
    @setPage="(page) => (filters.page = page)"
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
    page: 1,
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
    filters.value["page"] = 1;
  }
);

definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped></style>
