<template>
  <div class="blog-once">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <Post :post="data" />
      <div class="blog-once-sumilar" v-if="posts?.length">
        <TitleList
          :link="`/blogs?filterEQ[post_category_id]=${data?.post_category_id}`"
          linkText="All news"
          title="More news"
        ></TitleList>
        <PostsList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data, get } = await useApi({
  name: "posts.getByTitleLink",
  params: {
    extends:
      "image.image,user,car.images.image,car.generation.model_car.brand,car.price,car.fuel_type,car.transmission,car.price_special,car.security_deposit",
  },

  requestParams: {
    title_link: route.params?.title_link,
  },
});
await get();

const { data: posts, get: getPosts } = await useApi({
  name: "posts.getAll",
  params: {
    extends: "image.image",
    // "filterEQ[post_category_id]": data.value?.post_category_id,
    "filterEQ[is_show]": 1,
    limit: 4,
  },
});
await getPosts();

const breadcrumbs = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blogs" },
  {
    name: data.value?.title,
  },
];

useHead({
  script: [getPostSchema(data.value)],
  link: [
    {
      rel: "amphtml",
      href: config.public.BASE_URL + "/amp" + route.path,
    },
  ],
});

useSeoMeta(getPostSeoMeta(data.value));
</script>

<style lang="scss" scoped>
.blog-once {
  padding-bottom: 80px;

  &-sumilar {
    margin-top: 48px;
  }
}
</style>
