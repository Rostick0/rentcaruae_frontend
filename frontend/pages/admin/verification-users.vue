<template>
  <h1 class="h1 flex-style">
    <span>Verification users</span>
  </h1>
  <AdminVerificationUsersTable :data="data" />
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
  name: "verificationUsers.getAll",
  filters,
  params: {
    extends: "user.company",
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
