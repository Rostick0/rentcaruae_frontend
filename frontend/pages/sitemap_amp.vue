<template>
  <div class="sitemap">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="h1">Sitemap</h1>

      <h2 class="sitemap__title">Brands</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="brand in data?.brands"
          :to="setLink(brand?.link)"
          >{{ brand?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">Categories</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="category in data?.categories"
          :to="setLink(category?.link)"
          >{{ category?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">Bodies</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="body in data?.bodies"
          :to="setLink(body?.link)"
          >{{ body?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">Period</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="period in data?.periods"
          :to="setLink(period?.link)"
          >{{ period?.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const currentCity = useState("currentCity");

const config = useRuntimeConfig();

const data = await api.sitemap.get();

const setLink = (link) =>
  link
    ?.replace(config.public.BASE_URL, config.public.BASE_URL + "/amp")
    ?.replace?.("{current_city}", convertNameToUrl(currentCity.value?.name));

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Sitemap",
  },
];

const title = `Sitemap Amp - Rent a Car ${currentCity.value?.name}`;

useSeoMeta({
  title,
  ogTitle: title,
  ogImage: config.public.BASE_URL + "/images/RentCarUAE.jpg",
  ogImageWidth: 736,
  ogImageHeight: 414,
});
</script>

<style lang="scss" scoped>
.sitemap {
  &__title {
    margin-bottom: 4px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    margin-bottom: 16px;
  }

  &__link {
    color: var(--color-basic);
    display: flex;
    align-items: center;
    column-gap: 8px;

    &::before {
      background-color: var(--color-basic);
      border-radius: 50%;
      content: "";
      display: inline-block;
      width: 4px;
      height: 4px;
    }
  }
}
</style>
