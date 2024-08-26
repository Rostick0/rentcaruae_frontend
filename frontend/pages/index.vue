<template>
  <div class="container">
    <MainBanner />
    <MainBrands />
    <div class="car-cards">
      <!-- <CarCardShortList
        v-if="specialCars?.length"
        :cars="specialCars"
        title="Special offers"
        linkText="All special offers"
        :link="`/`"
      /> -->

      <CarCardShortList
        v-if="economyCars?.length"
        :cars="economyCars"
        title="Economy cars"
        linkText="All Economy cars"
        :link="convertNameToUrl(`/${currentCity?.name}/type/economy`)"
      />
      <CarCardShortList
        v-if="vanCars?.length"
        :cars="vanCars"
        title="Van cars"
        linkText="All Van cars"
        :link="convertNameToUrl(`/${currentCity?.name}/type/van`)"
      />
      <CarCardShortList
        v-if="suvCars?.length"
        :cars="suvCars"
        title="SUV for rent"
        linkText="All SUV"
        :link="convertNameToUrl(`/${currentCity?.name}/type/suv`)"
      />
      <CarCardShortList
        v-if="convertibleCars?.length"
        :cars="convertibleCars"
        title="Convertible cars"
        linkText="All Convertible cars"
        :link="convertNameToUrl(`/${currentCity?.name}/type/convertible`)"
      />
      <CarCardShortList
        v-if="businessCars?.length"
        :cars="businessCars"
        title="Business cars"
        linkText="All Business cars"
        :link="convertNameToUrl(`/${currentCity?.name}/type/business`)"
      />
      <CarCardShortList
        v-if="luxuryCars?.length"
        :cars="luxuryCars"
        title="Luxury cars"
        linkText="All Luxury cars"
        :link="convertNameToUrl(`/${currentCity?.name}/type/luxury`)"
      />
      <CarCardShortList
        v-if="sportsCars?.length"
        :cars="sportsCars"
        title="Sports cars"
        linkText="All Sports cars"
        :link="convertNameToUrl(`/${currentCity?.name}/type/sports`)"
      />
    </div>
    <MainServiceRental />
    <!-- <MainFaq /> -->
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");

const defaultParams = {
  extends: "images.image,price,price_special,generation.model_car.brand",
  "filterNEQ[price_special.price]": true,
  sort: "id",
  limit: 4,
};
// const { data: specialCars, get: getSpecialCars } = await useApi({
//   name: "car.getAll",
//   params: {
//     extends: "images.image,price,price_special,generation.model_car.brand",
//     "filterNEEQ[price_special.id]": true,
//     sort: "-id",
//     limit: 4,
//   },
// });

// await getSpecialCars();

const { data: economyCars, get: getEconomyCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 1,
  },
});
await getEconomyCars();

const { data: vanCars, get: getVanCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 2,
  },
});
await getVanCars();

const { data: suvCars, get: getSuvCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 3,
  },
});
await getSuvCars();

const { data: convertibleCars, get: getConvertibleCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 4,
  },
});
await getConvertibleCars();

const { data: businessCars, get: getBusinessCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 5,
  },
});
await getBusinessCars();

const { data: luxuryCars, get: getLuxuryCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 6,
  },
});
await getLuxuryCars();

const { data: sportsCars, get: getSportsCars } = await useApi({
  name: "car.getAll",
  params: {
    ...defaultParams,
    "filterEQ[category_id]": 6,
  },
});
await getSportsCars();

useHead({
  title: `Rent a Car ${currentCity.value?.name} | Cheap Car Rental ${currentCity.value?.name} | Car Hire UAE`,
  meta: [
    {
      property: "description",
      content: `Rent a car in ${currentCity.value?.name} at the best rates for all cars. A  car rental company in ${currentCity.value?.name} offers daily, weekly, and monthly car hire packages.`,
    },
  ],
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
