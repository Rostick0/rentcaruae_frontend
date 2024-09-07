<template>
  <h1 class="h1 flex-style">
    <span>Spendings users</span>
  </h1>
  <AdminSpendingsTable :data="data" />
  <AnyPagination
    @setPage="(page) => (filters.page = page)"
    :currentPage="meta?.current_page"
    limit="8"
    :totalCountData="meta?.total"
  />
</template>

<script setup>
const { filters } = useFilter({
  withQueryParams: true,
  withInitQueryParams: true,
  initialFilters: {
    page: 1,
  },
});

const { data, meta } = await useApi({
  name: "spendings.getAll",
  filters,
  params: {
    without_cache: true,
    sort: "date",
    // "filterGEQ[count]": 1,
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
