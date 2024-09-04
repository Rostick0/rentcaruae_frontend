<template>
  <h1 class="h1 flex-style">
    <span>Brands</span>
    <NuxtLink class="d-flex" to="/admin/brands/add">
      <UiButton class="page-cars__add" variant="outlined">+ Add brand</UiButton>
    </NuxtLink>
  </h1>
  <AdminBrandsTable :data="data" />
  <AnyPagination
    @setPage="(page) => (filters.page = page)"
    :currentPage="meta?.current_page"
    limit="8"
    :totalCountData="meta?.total"
  />
</template>

<script setup>
const { filters } = useFilter({
  initialFilters: {
    page: 1,
    // "filterGEQ[date]": selectedPeriod.value.id,
  },
});

const { data, meta } = await useApi({
  name: "brands.getAll",
  filters,
  params: {
    without_cache: true,
    sort: "id",
  },
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
