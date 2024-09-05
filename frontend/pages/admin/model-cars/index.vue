<template>
  <h1 class="h1 flex-style">
    <span>Models</span>
    <NuxtLink class="d-flex" to="/admin/model-cars/add">
      <UiButton class="page-cars__add" variant="outlined">+ Add model</UiButton>
    </NuxtLink>
  </h1>
  <AdminModelCarsTable :data="data" />
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
  name: "modelCars.getAll",
  filters,
  params: {
    extends: "brand",
    without_cache: true,
    sort: "id",
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
