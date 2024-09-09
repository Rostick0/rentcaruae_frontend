<template>
  <div class="blog-once">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <Post :post="data" />
      <div class="blog-once-sumilar">
        <div class="blog-once-sumilar__title"></div>
        <PostsList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { data, get } = await useApi({
  name: "posts.getByTitleLink",
  params: {
    extends:
      "image.image,car.images.image,car.generation.model_car.brand,car.price,car.fuel_type,car.transmission,car.price_special,car.security_deposit",
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
    "filterEQ[post_category_id]": data.value?.post_category_id,
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

// console.log(data.value);
</script>

<style lang="scss" scoped>
.blog-once {
  padding-bottom: 80px;

  &-sumilar {
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
}
</style>
