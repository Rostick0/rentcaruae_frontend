<template>
  <div class="blog-once">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <Post :post="post" />
      <div class="blog-once-sumilar" v-if="similarPosts?.length">
        <TitleList
          :link="`/blogs?filterEQ[post_category_id]=${post?.post_category_id}`"
          linkText="All news"
          title="More news"
        ></TitleList>
        <PostsList :posts="similarPosts" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

// Реактивные данные
const post = ref(null);
const similarPosts = ref([]);
const breadcrumbs = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blogs" },
  { name: post.value?.title || "Post" },
];

// Функция для загрузки данных
async function fetchData() {
  try {
    const [postResponse, postsResponse] = await Promise.all([
      useApi({
        name: "posts.getByTitleLink",
        params: {
          extends:
            "image.image,user,car.images.image,car.generation.model_car.brand,car.price,car.fuel_type,car.transmission,car.price_special,car.security_deposit",
        },
        requestParams: {
          title_link: route.params?.title_link,
        },
      }),
      useApi({
        name: "posts.getAll",
        params: {
          extends: "image.image",
          "filterEQ[is_show]": 1,
          limit: 4,
        },
      }),
    ]);

    post.value = await postResponse.get();
    similarPosts.value = await postsResponse.get();

    // Настройка SEO
    useSeoMeta(getPostSeoMeta(post.value));
    useHead({
      script: [getPostSchema(post.value)],
      link: [
        {
          rel: "amphtml",
          href: config.public.BASE_URL + "/amp" + route.path,
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Загрузка данных
await fetchData();
</script>

<style lang="scss" scoped>
.blog-once {
  padding-bottom: 80px;

  &-sumilar {
    margin-top: 48px;
  }
}
</style>
