<template>
  <div class="car">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="car__top">
        <LazyNuxtImg
          class="car__make_img"
          :src="data?.generation?.model_car?.brand?.image_url + '?=w60'"
          :title="data?.generation?.model_car?.brand?.name"
          :alt="`${data?.generation?.model_car?.brand?.name} for rent`"
          decoding="async"
          loading="lazy"
          width="40"
          height="40"
        />
        <h1 class="car__title h1">
          {{ h1 }}
        </h1>
      </div>
      <Car :car="data" :isLeasing="isLeasing" />
      <CarCardShortList
        v-if="cars?.length"
        :cars="cars"
        title="Similar Car Rental Options"
        :linkText="`All ${data?.category?.name}`"
        :link="
          convertNameToUrl(`/${currentCity?.name}/type/${data?.category?.name}`)
        "
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: Array,
});

const currentCity = useState("currentCity");

const id = useRoute().params.id;

const { create } = useView();
create(id);

const { data, get } = await useApi({
  name: "car.get",
  params: {
    extends: carFullExtends + ",user.company.city",
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
    // "filterEQ[generation.model_car.id]": data.value?.generation?.model_car?.id,
    "filterEQ[category_id": data.value?.category_id,
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
const isLeasing = computed(() => route.fullPath.split("/")[2] === "leasing");

const { h1, title, description } = getCarSeo(data.value, isLeasing.value);

useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
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
            priceCurrency: "AED",
            price: data.value?.price?.[0]?.price,
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
            priceCurrency: "AED",
            price: data.value?.price?.[1]?.price,
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
            priceCurrency: "AED",
            price: data.value?.price?.[2]?.price,
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
        // mileageFromOdometer: {
        //   "@type": "QuantitativeValue",
        //   value: data?.value?.mileage,
        //   unitCode: "KMT",
        // },
        // numberOfDoors: data.value?.modification?.doors_count,
      }),
      type: "application/ld+json",
    },
  ],
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
