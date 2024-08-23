<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1" v-if="h1">{{ h1 }}</h1>
      <slot name="topBlock" />
      <CarType v-model="filters['filterEQ[generation.name]']" />
      <LazyFilter :prices="prices" />
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
      <UiPagination
        class="catalog__pagination"
        v-model="filters.page"
        :meta="meta"
      />
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

const rent = computed(() =>
  route.fullPath.split("/")[2] === "leasing" ? "leasing" : "economy"
);

const paramLeasing = {};

if (rent.value === "leasing")
  paramLeasing["filterNEQ[price_leasing.id]"] = true;

const { data, get, meta } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special,security_deposit,user.company.image.image",
    sort: "promo_car.point,id",
    limit: 12,
    ...paramLeasing,
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

const { filters: pricesFilters } = useFilter({
  initialFilters: {
    ...setOneFilterValue(route.params, "car."),
  },
});

const { data: prices, get: getPrices } = await useApi({
  name: "pricePeriods.getAll",
  params: {
    limit: 8,
    sort: "-price",
    extends: "car",
    type: rent.value === "economy" ? "price" : "price_leasing",
  },
  filters: pricesFilters,
});
await getPrices();

watch(filters.value, (newV) => {
  ["filterEQ[generation.name]"]?.forEach((item) => {
    const a = item?.replace("filterEQ[", "filterEQ[car.");
    if (newV[item] !== pricesFilters.value[a]) {
      pricesFilters.value[a] = newV[item];
    }
  });
});

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
    name:
      rent.value === "leasing"
        ? `Car ${rent.value} in ${currentCity.value?.name}`
        : `Economy cars Rental`,
  },
]);

const h1 = computed(() =>
  rent.value === "leasing"
    ? `Car leasing in ${currentCity.value?.name} ${pageText.value}`.trim()
    : `Economy cars for rent in ${currentCity.value?.name} ${pageText.value}`.trim()
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

  &__pagination {
    margin-top: 40px;
  }
}
</style>
