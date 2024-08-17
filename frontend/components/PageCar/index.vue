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
          {{ data?.title }} in {{ data?.user?.company?.city?.name ?? "World" }}
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
    extends: carFullExtends + ",user.company.image.image,user.company.city",
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
