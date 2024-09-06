<template>
  <h1 class="h1 flex-style">
    <span>Deposite users</span>
  </h1>
  <AdminPaymentsTable :data="data" />
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
  name: "depositeUsers.getAll",
  filters,
  params: {
    extends: 'user,deposite',
    without_cache: true,
    sort: "id",
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
