<template>
  <div class="catalog">
    <div class="container">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="catalog__title h1" v-if="h1">{{ h1 }}</h1>
      <slot name="topBlock" />
      <CarType
        id="carType"
        :generations="generations"
        v-model="filters['filterEQ[generation.name]']"
      />
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
      <PageCatalogText :type="oneFilterType" :isLeasing="isLeasing" />
    </div>
  </div>
</template>

<script setup>
import chunk from "lodash/chunk";
import api from "~/api";
import { getBodyImages } from "~/utils/bodyTypes";

const { t } = useI18n();
const localePath = useLocalePath();

const props = defineProps({
  paramsCar: {
    type: Object,
    default: {},
  },
});

const config = useRuntimeConfig();

const route = useRoute();
const currentCity = useState("currentCity");

if (
  (route.params?.city &&
    currentCity.value?.name?.toLowerCase?.() !==
      route.params?.city?.replace("_", " ")) ||
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

const generations = ref(bodyTypesWithIcon);

if (route.params?.brand) {
  generations.value = await getBodyImages(
    await api.distinctValue.getAll({
      params: {
        table: "generations",
        column: "name",
        "filterEQ[model_car.brand.name]": oneFilterType.value?.value,
      },
    })
  );
}

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
    limit: 5,
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
    localePath,
    t,
    currentCity: currentCity.value,
    rent: rent,
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
        `Car ${rent} in ${currentCity.value?.name} ${pageText.value}`.trim(),
    });
  }
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
