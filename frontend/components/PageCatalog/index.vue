<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1" v-if="h1">{{ h1 }}</h1>
      <slot name="topBlock" />
      <CarType v-model="filters['filterEQ[generation.name]']" />
      <LazyFilter />
      <LazyCarCardList :cars="cars[0]" />
      <LazyCarCardShortList
        class="catalog__specials"
        v-if="carsSpecial?.length > 1"
        :cars="carsSpecial"
        title="Special offers"
        linkText="All special offers"
        link="/"
      />
      <LazyCarCardList :cars="cars[1]" />
      <UiPagination v-model="filters.page" :meta="meta" />
    </div>
  </div>
</template>

<script setup>
import chunk from "lodash/chunk";

const props = defineProps({
  paramsCar: {
    type: Object,
    default: {},
  },
});

const route = useRoute();

const { filters } = useFilter({
  initialFilters: {
    ...setOneFilterValue(route.params),
    page: +(route.params?.page ?? 1),
  },
});

const { data, get, meta } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special,security_deposit,user.company.image.image",
    sort: "promo_car.point,id",
    limit: 12,
    ...props?.paramsCar,
  },
  filters,
});

await get();

const cars = computed(() => chunk(data.value, 6));

const { data: carsSpecial, get: getCarsSpecial } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special",
    sort: "-id",
    "filterNotIN[id]": data.value?.map?.((item) => item?.id)?.join(),
    limit: 4,
  },
});

await getCarsSpecial();

const rent = computed(() =>
  route.fullPath.split("/")[2] === "leasing" ? "leasing" : "economy"
);
const currentCity = useState("currentCity");
const pageText = computed(() =>
  filters.value.page > 1 ? `- Page ${filters.value.page}` : ""
);

const breadcrumbs = computed(() => [
  {
    name: "Home",
    link: "/",
  },
  {
    name: currentCity.value?.name,
    link: convertNameToUrl(`/${currentCity.value?.name}`),
  },
  {
    name: `Car ${rent.value} in ${currentCity.value?.name}`,
  },
]);

const h1 = computed(() =>
  `Car ${rent.value} in ${currentCity.value?.name} ${pageText.value}`.trim()
);

watch(
  () => filters.value.page,
  (newV) => {
    window.history.pushState({}, null, setCatalogUrl(route.path, newV));
    useHead({
      title:
        `Car ${rent.value} in ${currentCity.value?.name} ${pageText.value}`.trim(),
    });
  }
);

useHead({
  title:
    `Car ${rent.value} in ${currentCity.value?.name} ${pageText.value}`.trim(),
  meta: [
    {
      name: "description",
      content:
        `Car ${rent.value} in ${currentCity.value?.name} ${pageText.value}`.trim(),
    },
  ],
});
</script>

<style lang="scss" scoped>
.catalog {
  &__specials {
    margin: 20px 0 40px;
  }
}
</style>
