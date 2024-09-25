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
      <PageCatalogText :type="oneFilterType" />
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

const config = useRuntimeConfig();

const route = useRoute();
const currentCity = useState("currentCity");

const oneFilterValue = setOneFilterValue(route.params);
const oneFilterType = ref(await getOneFilterType(route.params));

const { filters } = useFilter({
  initialFilters: {
    ...oneFilterValue,
    page: +(route.params?.page ?? 1),
    "filterIN[cities.city_id]": currentCity.value?.id,
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
    "filterEQ[is_show]": 1,
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special,price_leasing,security_deposit,user.company.image.image,cities",
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
    "filterEQ[is_show]": 1,
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

watch(
  () => currentCity.value,
  (newV) => {
    filters.value["filterIN[cities.city_id]"] = newV?.id;
  }
);

const pageText = computed(() =>
  filters.value.page > 1 ? `- Page ${filters.value.page}` : ""
);

const breadcrumbs = computed(() =>
  getCatalogBreadCrumbs({
    currentCity: currentCity.value,
    rent: rent.value,
    oneFilterType: oneFilterType.value,
  })
);

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
  oneFilterType.value,
  currentCity.value,
  pageText.value,
  rent.value === "leasing"
);

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
      href: config.public.BASE_URL + "/amp" + route.path,
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
