<template>
  <h1 class="h1 flex-style">
    <span>Posts</span>
    <NuxtLink class="d-flex" to="/admin/posts/add">
      <UiButton class="page-cars__add" variant="outlined">+ Add post</UiButton>
    </NuxtLink>
  </h1>
  <AdminPostsTable :data="data" />
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
  name: "posts.getAll",
  filters,
  params: {
    extends: "post_category",
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
