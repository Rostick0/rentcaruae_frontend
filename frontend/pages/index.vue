<template>
  <div class="overflow-hidden">
    <MainBanner />
    <div class="container">
      <MainBrands />
      <div class="car-cards">
        <CarCardShortList
          v-if="economyCars?.length"
          :cars="economyCars"
          :title="$t('economyCars')"
          :linkText="$t('allEconomyCars')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/economy`)"
          isPreloadFirst
        />
        <LazyCarCardShortList
          v-if="vanCars?.length"
          :cars="vanCars"
          :title="$t('vanCars')"
          :linkText="$t('allVanCars')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/van`)"
          isPreloadFirst
        />
        <LazyCarCardShortList
          v-if="suvCars?.length"
          :cars="suvCars"
          :title="$t('SUVForRent')"
          :linkText="$t('allSUV')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/suv`)"
          isPreloadFirst
        />
        <LazyCarCardShortList
          v-if="cabrioCars?.length"
          :cars="cabrioCars"
          :title="$t('cabrioCars')"
          :linkText="$t('allCabrioCars')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/cabrio`)"
        />
        <LazyCarCardShortList
          v-if="businessCars?.length"
          :cars="businessCars"
          :title="$t('businessCars')"
          :linkText="$t('allBusinessCars')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/business`)"
        />
        <LazyCarCardShortList
          v-if="luxuryCars?.length"
          :cars="luxuryCars"
          :title="$t('luxuryCars')"
          :linkText="$t('allLuxuryCars')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/luxury`)"
        />
        <LazyCarCardShortList
          v-if="electroCars?.length"
          :cars="electroCars"
          :title="$t('electroCars')"
          :linkText="$t('allElectroCars')"
          :link="convertNameToUrl(`/${currentCity?.name}/type/electric_(ev)`)"
        />
      </div>
      <div class="car-posts">
        <TitleList
          link="/blogs/"
          :linkText="$t('allNews')"
          :title="$t('blog')"
        />
        <PostsList :posts="posts" />
      </div>
      <MainServiceRental />
      <!-- <MainFaq /> -->
    </div>
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");

const config = useRuntimeConfig();

const defaultParams = {
  extends: "images.image,price,price_special,generation.model_car.brand",
  "filterEQ[is_show]": 1,
  // "filterNEQ[price_special.price]": true,
  sort: "id",
  limit: 4,
};

const { data: economyCars, get: getEconomyCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 1,
  },
});
await getEconomyCars();

const { data: vanCars, get: getVanCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 2,
  },
});
await getVanCars();

const { data: suvCars, get: getSuvCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 3,
  },
});
await getSuvCars();

const { data: cabrioCars, get: getCabrioCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 4,
  },
});
await getCabrioCars();

const { data: businessCars, get: getBusinessCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 5,
  },
});
await getBusinessCars();

const { data: luxuryCars, get: getLuxuryCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 6,
  },
});
await getLuxuryCars();

const { data: electroCars, get: getElectroCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[car_categories.category_id]": 8,
  },
});
await getElectroCars();

const { data: posts, get: getPosts } = await useApi({
  name: "posts.getAll",
  params: {
    ...defaultParams,
    extends: "image.image,user,post_category",
  },
});
await getPosts();

const title = `Rent a Car ${currentCity.value?.name} | Cheap Car Rental ${currentCity.value?.name} | Car Hire UAE`;
const description = `Rent a car in ${currentCity.value?.name} at the best rates for all cars. A  car rental company in ${currentCity.value?.name} offers daily, weekly, and monthly car hire packages.`;

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
      href: config.public.BASE_URL + "/amp",
    },
  ],
});
</script>

<style lang="scss" scoped>
.car {
  &-cards {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-bottom: 20px;
  }

  &-posts {
    margin-bottom: 20px;
  }
}
</style>
