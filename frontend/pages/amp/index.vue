<template>
  <div class="overflow-hidden">
    <AmpMainBanner />
    <div class="container">
      <AmpMainBrands />
      <div class="car-cards">
        <AmpCarCardShortList
          v-if="economyCars?.length"
          :cars="economyCars"
          :title="$t('economyCars')"
          :linkText="$t('allEconomyCars')"
          :link="
            $localePath(convertNameToUrl(`/${currentCity?.name}/type/economy`))
          "
        />
        <AmpCarCardShortList
          v-if="vanCars?.length"
          :cars="vanCars"
          :title="$t('vanCars')"
          :linkText="$t('allVanCars')"
          :link="
            $localePath(convertNameToUrl(`/${currentCity?.name}/type/van`))
          "
        />
        <AmpCarCardShortList
          v-if="suvCars?.length"
          :cars="suvCars"
          :title="$t('SUVForRent')"
          :linkText="$t('allSUV')"
          :link="
            $localePath(convertNameToUrl(`/${currentCity?.name}/type/suv`))
          "
        />
        <AmpCarCardShortList
          v-if="cabrioCars?.length"
          :cars="cabrioCars"
          :title="$t('cabrioCars')"
          :linkText="$t('allCabrioCars')"
          :link="
            $localePath(convertNameToUrl(`/${currentCity?.name}/type/cabrio`))
          "
        />
        <AmpCarCardShortList
          v-if="businessCars?.length"
          :cars="businessCars"
          :title="$t('businessCars')"
          :linkText="$t('allBusinessCars')"
          :link="
            $localePath(convertNameToUrl(`/${currentCity?.name}/type/business`))
          "
        />
        <AmpCarCardShortList
          v-if="luxuryCars?.length"
          :cars="luxuryCars"
          :title="$t('luxuryCars')"
          :linkText="$t('allLuxuryCars')"
          :link="
            $localePath(convertNameToUrl(`/${currentCity?.name}/type/luxury`))
          "
        />
        <AmpCarCardShortList
          v-if="electroCars?.length"
          :cars="electroCars"
          :title="$t('electroCars')"
          :linkText="$t('allElectroCars')"
          :link="
            $localePath(
              convertNameToUrl(`/${currentCity?.name}/type/electric_(ev)`)
            )
          "
        />
      </div>
      <MainServiceRental />
    </div>
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");

const { t } = useI18n();

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

const title = t("main_seo.title", {
  cityName: currentCity.value?.name,
});
const description = t("main_seo.description", {
  cityName: currentCity.value?.name,
});

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: config.public.BASE_URL + "/images/RentCarUAE.jpg",
  ogImageWidth: 736,
  ogImageHeight: 414,
});

definePageMeta({
  layout: "amp-default",
});
</script>

<style lang="scss" scoped>
.car-cards {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 20px;
}
</style>
