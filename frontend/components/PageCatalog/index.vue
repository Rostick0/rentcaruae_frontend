<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1" v-if="h1">{{ h1 }}</h1>
      <slot name="topBlock" />
      <CarType id="carType" v-model="filters['filterEQ[generation.name]']" />
      <LazyFilter :prices="prices" />
      <LazyCarCardList :cars="cars[0]" :isLeasing="isLeasing" />
      <LazyCarCardShortList
        class="catalog__specials"
        v-if="carsSpecial?.length > 1"
        :cars="carsSpecial"
        title="Special offers"
        linkText="All special offers"
        link="/"
      />
      <LazyCarCardList :cars="cars[1]" :isLeasing="isLeasing" />
      <UiPagination
        class="catalog__pagination"
        v-model="filters.page"
        :meta="meta"
      />
      <!-- <PageCatalogTextBodyConvertible /> -->
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

const oneFilterValue = setOneFilterValue(route.params);

const { filters } = useFilter({
  initialFilters: {
    ...oneFilterValue,
    page: +(route.params?.page ?? 1),
  },
});

const rent = computed(() =>
  route.fullPath.split("/")[2] === "leasing" ? "leasing" : "economy"
);

const isLeasing = computed(() => rent.value === "leasing");

const paramLeasing = {};

if (rent.value === "leasing")
  paramLeasing["filterNEQ[price_leasing.id]"] = true;

const { data, get, meta } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special,price_leasing,security_deposit,user.company.image.image",
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
    extends: "car.generation.model_car.brand",
    "filterEQ[type]": rent.value === "leasing" ? "price_leasing" : "price",
    "filterGEQ[price]": 1,
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

watch(
  () => filters.value.page,
  (newV) => {
    document
      .querySelector("#carType")
      ?.scrollIntoView?.({ behavior: "smooth" });
    window.history.pushState({}, null, setCatalogUrl(route.path, newV));
    useHead({
      title:
        `Car ${rent.value} in ${currentCity.value?.name} ${pageText.value}`.trim(),
    });
  }
);

const { title, description, h1 } = getCatalogSeo(
  getOneFilterType(route.params),
  currentCity.value,
  pageText.value,
  rent.value === "leasing"
);

useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
});
</script>

<style lang="scss" scoped>
.catalog {
  padding-bottom: 20px;

  &__specials {
    margin: 20px 0 40px;
  }

  &__pagination {
    margin-top: 40px;
  }
}
</style>
