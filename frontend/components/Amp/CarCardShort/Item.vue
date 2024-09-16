<template>
  <NuxtLink
    class="car-short"
    :to="
      convertNameToUrl(
        `/${currentCity?.name}/${
          route.fullPath.split('/')[2] === 'leasing' ? 'leasing' : 'rent'
        }/${car?.generation?.model_car?.brand?.name}/${
          car?.generation?.model_car?.name
        }/${car?.id}`
      )
    "
  >
    <div class="car-short__image">
      <amp-img
        class="car-short__img"
        :src="car?.images?.[0]?.image?.path_webp + '?w=300'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        width="264"
        height="166"
      />
    </div>
    <div class="car-short__content">
      <div class="car-short__content_left">
        <div class="car-short__title">{{ car?.title }}</div>
        <div class="car-short__info">
          <span>From</span>
          <del class="car-short__price-old" v-if="car?.price_special?.[0]"
            >AED {{ priceOld }}</del
          >
          <span class="car-short__price text-ui">AED {{ price }}</span>
          <span>per day</span>
        </div>
      </div>
      <amp-img
        class="car-short__brand"
        :src="car?.generation?.model_car?.brand?.image_url + '?=w60'"
        :title="car?.generation?.model_car?.brand?.name"
        :alt="`${car?.generation?.model_car?.brand?.name} for rent`"
        width="40"
        height="40"
      />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const route = useRoute();

const currentCity = useState("currentCity");

const price = computed(() =>
  formatNumber(
    props.car?.price_special?.[0]?.price
      ? Math.round(
          props.car?.price_special?.[0]?.price /
            props.car?.price_special?.[0]?.period
        )
      : Math.round(props.car?.price?.[0]?.price / props.car?.price?.[0]?.period)
  )
);

const priceOld = computed(() =>
  formatNumber(props.car?.price?.[0]?.price / props.car?.price?.[0]?.period)
);
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
    }
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

  &__brand {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
  }
}
</style>
