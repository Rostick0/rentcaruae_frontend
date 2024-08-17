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
        v-if="carsSec?.length > 1"
        :cars="carsSec"
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
  h1: String,
  breadcrumbs: Array,
  paramsCar: Object,
});

const route = useRoute();

const { filters } = useFilter({
  initialFilters: {
    ...setOneFilterValue(route.params),
    page: 1,
  },
});

const { data, get, meta } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special,security_deposit,user.company.image.image",
    sort: "-id",
    limit: 8,
    ...props?.paramsCar,
  },
  filters,
});

await get();

const cars = computed(() => chunk(data.value, 6));

const { data: carsSec, get: getCarsSec } = await useApi({
  name: "car.getAll",
  params: {
    extends:
      "generation.model_car.brand,price,images.image,fuel_type,transmission,price_special",
    sort: "-id",
    "filterNotIN[id]": data.value?.map?.((item) => item?.id)?.join(),
    limit: 4,
  },
});

await getCarsSec();

// watch(() => filters.value.page, (newV) => {
//   console.log(newv);
//   // window.history.pushState({}, null, getNewUrl(stateRoute.value));
// });
</script>

<style lang="scss" scoped>
.catalog {
  &__specials {
    margin: 20px 0 40px;
  }
}
</style>
