<template>
  <div class="blog-once">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <AmpPost :post="data" />
      <div class="blog-once-sumilar" v-if="posts?.length">
        <div class="blog-once-sumilar__top">
          <h2>More news</h2>
          <LinkMore
            name="All news"
            :to="`/blogs?filterEQ[post_category_id]=${data?.post_category_id}`"
          />
        </div>
        <AmpPostsList :posts="posts" />
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
    limit: 4,
  },
});
await getPosts();

const { t } = useI18n();
const localePath = useLocalePath();

const breadcrumbs = [
  { name: t("home"), link: localePath("/") },
  { name: t("blog"), link: localePath("/blogs") },
  {
    name: data.value?.title,
  },
];

useHead({
  script: [
    {
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: data.value?.title,
        image: [data.value?.image?.image?.path_webp],
        datePublished: data.value?.created_at,
        datePublished: data.value?.updated_at,
        description: data.value?.short_description,
        author: {
          "@type": "Person",
          name: data.value?.user?.full_name,
        },
      }),
      type: "application/ld+json",
    },
  ],
});

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.short_description,
  ogDescription: data.value?.short_description,
  ogImage: data.value?.image?.image?.path_webp,
  ogImageWidth: data.value?.image?.image?.width,
  ogImageHeight: data.value?.image?.image?.height,
  ogType: "article",
});

definePageMeta({
  layout: "amp-default",
});
</script>

<style lang="scss" scoped>
.blog-once {
  padding-bottom: 80px;

  &-sumilar {
    margin-top: 48px;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
}
</style>
