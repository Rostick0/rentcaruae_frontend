<template>
  <div class="car-short">
    <div class="car-short__image">
      <LazyNuxtImg
        class="car-short__img"
        :src="car?.images?.[0]?.image?.path_webp + '?w=280'"
        :alt="car?.title"
        decoding="async"
        loading="lazy"
        width="264"
        height="166"
      />
    </div>
    <NuxtLink
      class="car-short__content"
      :to="
        convertNameToUrl(
          `/${city?.name}/${
            route.fullPath.split('/')[2] === 'leasing' ? 'leasing' : 'rent'
          }/${car?.generation?.model_car?.brand?.name}/${
            car?.generation?.model_car?.name
          }/${car?.id}`
        )
      "
    >
      <div class="car-short__content_left">
        <div class="car-short__title">{{ car?.title }}</div>
        <div class="car-short__info">
          <span>From</span>
          <del class="car-short__price-old" v-if="car?.price_special?.[0]"
            >AED {{ formatNumber(car?.price?.[0]?.price) }}AED
            {{ car?.price_old }}</del
          >
          <span class="car-short__price text-ui"
            >AED
            {{
              formatNumber(
                car?.price_special?.[0]?.price ?? car?.price?.[0]?.price
              )
            }}</span
          >
          <span>per day</span>
        </div>
      </div>
      <LazyNuxtImg
        class="car-short__icon"
        :src="
          $config.public.BACK_URL + car?.generation?.model_car?.brand?.image_url
        "
        :alt="car?.generation?.model_car?.brand?.name"
        loading="lazy"
        width="40"
        height="40"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const route = useRoute();

const city = useState("currentCity");
</script>

<style lang="scss" scoped>
.car-short {
  background-color: var(--color-white);
  border-radius: 8px;

  &__image {
    display: flex;
    padding-top: 63%;
    position: relative;
  }

  &__img {
    border-radius: 8px;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    padding: 8px;
    padding-top: 7px;
    padding-right: 4px;

    &__left {
      font-weight: 700;
    }
  }

  &__title {
    font-size: 14px;
    margin-bottom: 2px;
  }

  &__info {
    display: flex;
    grid-gap: 4.5px;
    align-items: flex-end;
    font-size: 12px;
  }

  &__price {
    font-size: 14px;

    &-old {
      color: var(--color-old-val);
    }
  }
}
</style>
