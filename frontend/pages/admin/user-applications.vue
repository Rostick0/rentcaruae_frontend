<template>
  <h1 class="h1 flex-style">
    <span>Register users</span>
  </h1>
  <AdminUserApplicationsTable :data="data" :get="get" />
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

const { data, get, meta } = await useApi({
  name: "userApplications.getAll",
  filters,
  params: {
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
