<template>
  <div class="car">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="car__top">
        <amp-img
          class="car__make_img"
          :src="data?.generation?.model_car?.brand?.image_url + '?=w60'"
          :title="data?.generation?.model_car?.brand?.name"
          :alt="`${data?.generation?.model_car?.brand?.name} for rent`"
          width="40"
          height="40"
        />
        <h1 class="car__title h1">
          {{ h1 }}
        </h1>
      </div>
      <AmpCar :car="data" :isLeasing="isLeasing" />
      <AmpCarCardShortList
        v-if="cars?.length"
        :cars="cars"
        title="Similar Car Rental Options"
        :linkText="`All ${data?.car_categories?.[0]?.category?.name}`"
        :link="
          convertNameToUrl(
            `/${currentCity?.name}/type/${data?.car_categories?.[0]?.category?.name}`
          )
        "
      />
    </div>
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");
const rent = computed(() =>
  route.fullPath.split("/")[2] === "leasing" ? "leasing" : "economy"
);

const { t } = useI18n();
const localePath = useLocalePath();

const { currentExchangeRate, getConvertedPrice } = await useExchangeRate();

const id = useRoute().params.id;

const { create } = useView();
create(id);

const { data, get } = await useApi({
  name: "car.get",
  params: {
    "filterEQ[is_show]": 1,
    extends: carFullExtends + ",user.company.city",
  },
  requestParams: {
    id,
  },
});
await get();

const breadcrumbs = computed(() => [
  ...getCatalogBreadCrumbs({
    t,
    localePath,
    currentCity: currentCity.value,
    rent: rent.value,
    oneFilterType: {
      value: data.value?.category?.name,
      type: "type",
    },
  }),
  { name: data.value?.title },
]);

const { data: cars, get: getCars } = await useApi({
  name: "car.getAll",
  params: {
    "filterNEQ[id]": id,
    // "filterEQ[generation.model_car.id]": data.value?.generation?.model_car?.id,
    "filterIN[car_categories.category_id]": data.value?.car_categories
      ?.map?.((item) => item?.category_id)
      ?.join(","),
    "filterEQ[is_show]": 1,
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

const route = useRoute();
const isLeasing = computed(() => route.fullPath.split("/")[3] === "leasing");

const { h1, title, description } = getCarSeo(
  data.value,
  isLeasing.value,
  currentCity.value,
  t
);

useHead({
  script: [
    {
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: data?.value?.title,
        description: data?.value?.description,
        image: data?.value?.images?.map?.((item) => item?.image?.path_webp),
        offers: [
          {
            "@type": "Offer",
            priceCurrency: currentExchangeRate?.value?.name,
            price: getConvertedPrice(data.value?.price?.[0]?.price),
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            rentalDuration: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "DAY",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: currentExchangeRate?.value?.name,
            price: getConvertedPrice(data.value?.price?.[1]?.price),
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            rentalDuration: {
              "@type": "QuantitativeValue",
              value: 7,
              unitCode: "DAY",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: currentExchangeRate?.value?.name,
            price: getConvertedPrice(data.value?.price?.[2]?.price),
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            rentalDuration: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MONTH",
            },
          },
        ],
        color: data.value?.colour?.name,
        vehicleInteriorColor: data.value?.colour_interior?.name,
        bodyType: data.value?.generation?.name,
        itemCondition: "https://schema.org/NewCondition",
        brand: {
          "@type": "Brand",
          name: data.value?.generation?.model_car?.brand?.name,
        },
        model: data.value?.generation?.model_car?.name,
        vehicleModelDate: data.value?.year,
        vehicleEngine: {
          "@type": "EngineSpecification",
          fuelType: data.value?.fuel_type?.name,
        },
      }),
      type: "application/ld+json",
    },
    {
      async: true,
      "custom-element": "amp-carousel",
      src: "https://cdn.ampproject.org/v0/amp-carousel-0.1.js",
    },
  ],
});

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: data.value?.images?.[0]?.image?.path_webp,
  ogImageWidth: data.value?.images?.[0]?.image?.width,
  ogImageHeight: data.value?.images?.[0]?.image?.height,
});
</script>

<style lang="scss" scoped>
.car {
  padding-bottom: 40px;

  &__top {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 39px;
  }

  &__make {
    &_img {
      flex-shrink: 0;
    }
  }

  &__title {
    margin-bottom: 0;
  }
}
</style>
