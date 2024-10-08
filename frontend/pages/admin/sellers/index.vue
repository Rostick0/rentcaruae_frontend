<template>
  <h1 class="h1 flex-style">
    <span>Dealers</span>
    <NuxtLink class="d-flex" to="/admin/sellers/add/">
      <UiButton class="page-cars__add" variant="outlined">+ Add dealers</UiButton>
    </NuxtLink>
  </h1>
  <AdminSellersTable :data="data" />
  <AnyPagination
    @setPage="(page) => (filters.page = page)"
    :currentPage="meta?.current_page"
    :limit="limit"
    :totalCountData="meta?.total"
  />
</template>

<script setup>
const limit = 8;

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
    limit,
    // "filterEQ[role]": "seller",
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
