<template>
  <h1 class="h1 seller">Leads</h1>
  <SellerSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  />
  <SellerLeadsTable :leads="data" />
  <!-- <AnyPagination
    @setPage="(page) => (filters.page = page)"
    :currentPage="meta?.current_page"
    limit="8"
    :totalCountData="meta?.total"
  /> -->
</template>

<script setup>
import moment from "moment";

const options = [
  {
    id: moment().format("YYYY-MM-DD"),
    name: "1 day",
  },
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
    "filterGEQ[created_at]": selectedPeriod.value.id,
  },
});

const { data, meta } = await useApi({
  name: "operations.getAll",
  params: {
    extends: "car.generation.model_car.brand",
    sort: "id",
  },
  filters,
  init: true,
});

watch(
  () => selectedPeriod.value,
  (newV) => {
    filters.value["filterGEQ[created_at]"] = newV.id;
  }
);

definePageMeta({
  layout: "seller",
});
</script>
