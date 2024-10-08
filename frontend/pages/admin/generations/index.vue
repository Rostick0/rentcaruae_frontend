<template>
  <h1 class="h1 flex-style">
    <span>Generations</span>
    <NuxtLink class="d-flex" to="/admin/model-cars/add/">
      <UiButton class="page-cars__add" variant="outlined"
        >+ Add generation</UiButton
      >
    </NuxtLink>
  </h1>
  <AdminGenerationsTable :data="data" />
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
  name: "generations.getAll",
  filters,
  params: {
    extends: "model_car.brand",
    without_cache: true,
    sort: "id",
    limit,
  },
  init: true,
});

definePageMeta({
  layout: "admin",
});
</script>
