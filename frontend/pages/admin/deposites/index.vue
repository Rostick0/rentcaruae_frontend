<template>
  <h1 class="h1 flex-style">
    <span>Deposites</span>
    <NuxtLink class="d-flex" to="/admin/deposites/add/">
      <UiButton class="page-cars__add" variant="outlined"
        >+ Add depostie</UiButton
      >
    </NuxtLink>
  </h1>
  <AdminDepositesTable :data="data" />
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
  initialFilters: {
    page: 1,
  },
});

const { data, meta } = await useApi({
  name: "deposites.getAll",
  filters,
  params: {
    extends: "deposite_leads",
    limit,
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
