<template>
  <div class="sitemap">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="h1">{{ $t("sitemap") }}</h1>

      <h2 class="sitemap__title">{{ $t("brands") }}</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="brand in data?.brands"
          :to="setLink(brand?.link)"
          >{{ brand?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">{{ $t("categories") }}</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="category in data?.categories"
          :to="setLink(category?.link)"
          >{{ category?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">{{ $t("bodies") }}</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="body in data?.bodies"
          :to="setLink(body?.link)"
          >{{ body?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">{{ $t("period") }}</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="period in data?.periods"
          :to="setLink(period?.link)"
          >{{ period?.name }}</NuxtLink
        >
      </div>

      <h2 class="sitemap__title">{{ $t("aboutUs") }}</h2>
      <div class="sitemap__list">
        <NuxtLink
          class="sitemap__link"
          v-for="item in data?.about_us?.slice(0, 2)"
          :to="setAmpLink(item?.link)"
          >{{ item?.name }}</NuxtLink
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

const setAmpLink = (link) =>
  link?.replace(config.public.BASE_URL, config.public.BASE_URL + "/amp");

const setLink = (link) =>
  setAmpLink(
    link?.replace?.("{current_city}", convertNameToUrl(currentCity.value?.name))
  );

const { t } = useI18n();

const breadcrumbs = [
  {
    name: t("home"),
    link: "/",
  },
  {
    name: t("sitemap"),
  },
];

const title = `${t("sitemapAmpTitle")} ${currentCity.value?.name}`;

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
    width: fit-content;

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
