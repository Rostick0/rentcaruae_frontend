<template>
  <h1 class="h1 flex-style">
    <span>Dealers</span>
  </h1>
  <AdminSellersTable :data="data" />
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
  name: "users.getAll",
  filters,
  params: {
    extends: "deposite_last",
    without_cache: true,
    sort: "id",
    // "filterEQ[role]": "seller",
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
