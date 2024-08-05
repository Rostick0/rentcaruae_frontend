<template>
  <div class="car">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="car__top">
        <LazyNuxtImg
          class="car__make_img"
          :src="
            $config.public.BACK_URL +
            data?.generation?.model_car?.brand?.image_url
          "
          decoding="async"
          loading="lazy"
          :alt="data?.generation?.model_car?.brand?.name"
          width="40"
          height="40"
        />
        <h1 class="car__title h1">
          {{ data?.title }} in {{ data?.user?.city?.name ?? "Dubai" }}
        </h1>
      </div>
      <Car :car="data" />
      <CarCardShortList
        v-if="data?.length"
        :cars="cars"
        title="Similar Car Rental Options"
        linkText="All convertible"
        link="/"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: Array,
});

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "car.get",
  params: {
    extends: carFullExtends,
  },
  requestParams: {
    id,
  },
});

await get();

const { data: cars, get: getCars } = await useApi({
  name: "car.getAll",
  params: {
    "filterNEQ[id]": id,
    "filterEQ[generation.model_car.id]": data.value?.generation?.model_car?.id,
    extends: [
      "generation.model_car.brand",
      "images.image",
      "price",
      "price_special",
    ].join(),
    limit: 4,
  },
});

await getCars();
// const car = {
//   id: 1,
//   title: "Ferrari SF90 Spider 2022 Hire",
//   price_day: 39788,
//   gearbox: "auto",
//   persons: 4,
//   fuel_type: "petrol",
//   images: [
//     {
//       path: "images/fake/5aec76a840489ac44a598776e247653e.jfif",
//     },
//     {
//       path: "images/fake/8d8f9b4d964931ca7ce17172842e80f3.jfif",
//     },
//     {
//       path: "images/fake/c1be2828eb4287dbe4abd09587e2dd8d.jfif",
//     },
//     {
//       path: "images/fake/a3130d83c1cfa5ac446b1ac68ea7104e.jfif",
//     },
//   ],
//   prices: [
//     {
//       id: 1,
//       min: 1,
//       max: 2,
//       price: 3499,
//     },
//     {
//       id: 2,
//       min: 3,
//       max: 4,
//       price: 3299,
//     },
//     {
//       id: 3,
//       min: 7,
//       max: 29,
//       price: 3199,
//     },
//     {
//       id: 4,
//       min: 30,
//       max: null,
//       price: 3199,
//     },
//     {
//       id: 5,
//       min: 30,
//       max: 30 * 12,
//       price: 3099,
//     },
//   ],
//   make: {
//     name: "",
//     path: "images/fake/Logos (3).png",
//   },
//   user: {
//     name: "",
//     path: "images/fake/thrifty-car-rental-lg.png 1.png",
//   },
//   options: ["NEW", "Special offer"],
//   modules: ["1 day rental available", "Insurance included", "Free delivery"],
//   description:
//     "Renty offers different car rental plans, from a standard one-day agreement to yearly rentals. You can usually hire a luxury vehicle for at least one day. However, some cars are eligible for an hourly hire. Our car rental platform also provides fully featured car leasing in the UAE, including top-notch vehicles from all the categories listed on the website.\n\nCustomers can also rent economy cars for a month or even a year. It is also quite common for people to extend their rental agreement. Contact us to learn more about available plans for the vehicle of your choice.",
//   city: {
//     name: "Dubai",
//   },
//   specifications: [
//     {
//       name: "Parking sensores",
//       type: "safety",
//     },
//     {
//       name: "Rear Camera",
//       type: "safety",
//     },
//     {
//       name: "Isofix",
//       type: "safety",
//     },
//     {
//       name: "Navigation",
//       type: "multimedia",
//     },
//     {
//       name: "Apple CarPlay",
//       type: "multimedia",
//     },
//     {
//       name: "Cruisw Control",
//       type: "comfort",
//     },
//     {
//       name: "Basic Autopilot",
//       type: "comfort",
//     },
//   ],
// };

// const cars = [
//   {
//     id: 1,
//     title: "Ferrari F8 Tributo Spyder",
//     price_old: 800,
//     price: 699,
//     image: {
//       path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1.png",
//     },
//     make: {
//       name: "",
//       path: "images/fake/Logos (2).png",
//     },
//   },
//   {
//     id: 2,
//     title: "BMW 430i cabrio",
//     price_old: 800,
//     price: 499,
//     image: {
//       path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (1).png",
//     },
//     make: {
//       name: "",
//       path: "images/fake/Logos (3).png",
//     },
//   },
//   {
//     id: 3,
//     title: "Rolls Royce Cullinan",
//     price_old: 800,
//     price: 599,
//     image: {
//       path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (2).png",
//     },
//     make: {
//       name: "",
//       path: "images/fake/Logos (4).png",
//     },
//   },
// ];
</script>

<style lang="scss" scoped>
.car {
  &__top {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 39px;
  }

  &__make {
  }

  &__title {
    margin-bottom: 0;
  }
}
</style>
