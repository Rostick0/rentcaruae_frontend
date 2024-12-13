<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1" v-if="h1">{{ h1 }}</h1>
      <slot name="topBlock" />
      <AmpCarType id="carType" v-model="filters['filterEQ[generation.name]']" />
      <Filter :prices="prices" />
      <AmpCarCardList :cars="cars[0]" :isLeasing="isLeasing" />
      <AmpCarCardShortList
        class="catalog__specials"
        v-if="carsSpecial?.length > 1"
        :cars="carsSpecial"
        title="Special offers"
        linkText="All special offers"
        link="/"
      />
      <AmpCarCardList :cars="cars[1]" :isLeasing="isLeasing" />
      <AmpUiPagination
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

const { t } = useI18n();
const localePath = useLocalePath();

if (
  (route.params?.city &&
    currentCity.value?.name?.toLowerCase?.() !== route.params?.city) ||
  (route.params?.page && isNaN(route.params.page)) ||
  (route.params?.period &&
    !periodOptions.find((item) => item.name === route.params?.period))
) {
  navigateTo("/404");
}

const oneFilterValue = setOneFilterValue(route.params);
const oneFilterType = ref(await getOneFilterType(route.params));

const { filters } = useFilter({
  initialFilters: {
    ...oneFilterValue,
    page: +(route.params?.page ?? 1),
    "filterIN[cities.city_id]": currentCity.value?.id,
  },
});

const rent = route.fullPath.split("/")[2] === "leasing" ? "leasing" : "economy";
const isLeasing = rent === "leasing";

const paramLeasing = {};

if (rent === "leasing") paramLeasing["filterNEQ[price_leasing.id]"] = true;

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

if (meta.value?.total < 1) {
  navigateTo("/404");
}

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
    "filterEQ[type]": rent === "leasing" ? "price_leasing" : "price",
    "filterGEQ[price]": 1,
  },
  filters: pricesFilters,
});
await getPrices();

const pageText = computed(() =>
  filters.value.page > 1 ? `- Page ${filters.value.page}` : ""
);

const breadcrumbs = computed(() =>
  getCatalogBreadCrumbs({
    t,
    localePath,
    currentCity: currentCity.value,
    rent: rent,
    oneFilterType: oneFilterType.value,
  })
);

const { title, description, h1 } = getCatalogSeo(
  oneFilterType.value,
  currentCity.value,
  pageText.value,
  rent === "leasing",
  t
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
