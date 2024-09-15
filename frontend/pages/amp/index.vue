<template>
  <div class="overflow-hidden">
    <AmpMainBanner />
    <div class="container">
      <AmpMainBrands />
      <div class="car-cards">
        <AmpCarCardShortList
          v-if="economyCars?.length"
          :cars="economyCars"
          title="Economy cars"
          linkText="All Economy cars"
          :link="convertNameToUrl(`/${currentCity?.name}/type/economy`)"
        />
        <AmpCarCardShortList
          v-if="vanCars?.length"
          :cars="vanCars"
          title="Van cars"
          linkText="All Van cars"
          :link="convertNameToUrl(`/${currentCity?.name}/type/van`)"
        />
        <AmpCarCardShortList
          v-if="suvCars?.length"
          :cars="suvCars"
          title="SUV for rent"
          linkText="All SUV"
          :link="convertNameToUrl(`/${currentCity?.name}/type/suv`)"
        />
        <AmpCarCardShortList
          v-if="cabrioCars?.length"
          :cars="cabrioCars"
          title="Cabrio cars"
          linkText="All Cabrio cars"
          :link="convertNameToUrl(`/${currentCity?.name}/type/cabrio`)"
        />
        <AmpCarCardShortList
          v-if="businessCars?.length"
          :cars="businessCars"
          title="Business cars"
          linkText="All Business cars"
          :link="convertNameToUrl(`/${currentCity?.name}/type/business`)"
        />
        <AmpCarCardShortList
          v-if="luxuryCars?.length"
          :cars="luxuryCars"
          title="Luxury cars"
          linkText="All Luxury cars"
          :link="convertNameToUrl(`/${currentCity?.name}/type/luxury`)"
        />
        <AmpCarCardShortList
          v-if="electroCars?.length"
          :cars="electroCars"
          title="Electro cars"
          linkText="All Electro cars"
          :link="convertNameToUrl(`/${currentCity?.name}/type/electric_(ev)`)"
        />
      </div>
      <MainServiceRental />
    </div>
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");

const config = useRuntimeConfig();

const defaultParams = {
  extends: "images.image,price,price_special,generation.model_car.brand",
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
