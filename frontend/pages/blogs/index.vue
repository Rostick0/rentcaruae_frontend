<template>
  <div class="blog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="h1">Car Rental Blog</h1>
      <PostCategories
        :modelValue="filters['filterEQ[post_category_id]']"
        @update:modelValue="
          (val) => (filters['filterEQ[post_category_id]'] = val)
        "
      />
      <div class="blog__content">
        <h2 class="blog__h2">News</h2>
        <PostMobile v-if="isMobileOrTablet" :posts="data" />
        <PostDesktop v-else :posts="data" />
        <!-- <PostCard :post="postFirst" />
        <PostsList :posts="otherPosts" /> -->
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
const { isMobileOrTablet } = useDevice();
const breadcrumbs = [{ name: "Home", link: "/" }, { name: "Blog" }];

const config = useRuntimeConfig();
const route = useRoute();

const { filters } = useFilter({
  withQueryParams: true,
  withInitQueryParams: true,
  initialFilters: {
    // "filterEQ[post_category_id]": 1,
    page: 1,
  },
});

const { data, get, meta } = await useApi({
  name: "posts.getAll",
  filters,
  params: {
    extends: "image.image,user,post_category",
    "filterEQ[is_show]": 1,
    sort: "id",
    limit: isMobileOrTablet ? 9 : 17,
  },
});
await get();

const postFirst = computed(() => data.value?.[0]);
const otherPosts = computed(() => data.value?.splice?.(1));

const title = "RentcarUAE Car Rental Blog | Your adventure begins here";
const description =
  "All about car rental in Dubai. Reviews of new car manufacturers that can already be tested";

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: config.public.BASE_URL + "/images/RentCarUAE.jpg",
  ogImageWidth: 736,
  ogImageHeight: 414,
});

useHead({
  link: [
    {
      rel: "amphtml",
      href: config.public.BASE_URL + "/amp" + route.path,
    },
  ],
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
