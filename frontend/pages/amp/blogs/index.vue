<template>
  <div class="blog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="h1">Blog</h1>
      <AmpPostCategories :modelValue="filters['filterEQ[post_category_id]']" />
      <div class="blog__content">
        <h2 class="blog__h2">News</h2>
        <AmpPostCard :post="postFirst" />
        <AmpPostsList :posts="otherPosts" />
        <UiPagination
          class="catalog__pagination"
          v-model="filters.page"
          :meta="meta"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const breadcrumbs = [{ name: "Home", link: "/" }, { name: "Blog" }];

const { filters } = useFilter({
  withQueryParams: true,
  withInitQueryParams: true,
  initialFilters: {
    "filterEQ[post_category_id]": 1,
    page: 1,
  },
});

const { data, get, meta } = await useApi({
  name: "posts.getAll",
  filters,
  params: {
    extends: "image.image",
    sort: "id",
    limit: 17,
  },
});
await get();

const postFirst = computed(() => data.value?.[0]);
const otherPosts = computed(() => data.value?.splice?.(1));

definePageMeta({
  layout: "amp-default",
});
</script>

<style lang="scss" scoped>
.blog {
  padding-bottom: 80px;

  &__h2 {
    display: flex;
    align-items: center;
    height: 44px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
}
</style>

<style lang="scss">
.blog {
  .pagination {
    margin-top: 20px;
  }
}
</style>
