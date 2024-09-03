<template>
  <h1 class="h1 seller">Dashboard</h1>
  <!-- <SellerSelectPeriod
    v-model="selectedPeriod"
    :options="options"
    title="Date range"
    subtitle="Selected period:"
  /> -->
  <AdminBrandsTable :data="data" />
  <AnyPagination
    @setPage="(page) => (filters.page = page)"
    :currentPage="meta?.current_page"
    limit="8"
    :totalCountData="meta?.total"
  />
</template>

<script setup>
// import moment from "moment";

// const options = [
//   {
//     id: moment().subtract(7, "d").format("YYYY-MM-DD"),
//     name: "7 days",
//   },
//   {
//     id: moment().subtract(30, "d").format("YYYY-MM-DD"),
//     name: "30 days",
//   },
// ];

// const selectedPeriod = ref(options[0]);

const { filters } = useFilter({
  initialFilters: {
    page: 1,
    // "filterGEQ[date]": selectedPeriod.value.id,
  },
});

const { data, meta } = await useApi({
  name: "brands.getAll",
  filters,
  //   params: {
  //     sort: "date",
  //   },
  init: true,
});

// watch(
//   () => selectedPeriod.value,
//   (newV) => {
//     filters.value["filterGEQ[date]"] = newV.id;
//   }
// );

definePageMeta({
  layout: "admin",
});
</script>
