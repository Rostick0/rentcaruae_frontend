<template>
  <NuxtLink
    class="car-short"
    :to="link"
    itemscope
    itemtype="http://schema.org/Product"
  >
    <meta itemprop="mainEntityOfPage" :content="link" />
    <link itemprop="availability" href="https://schema.org/InStock" />
    <meta
      itemprop="image"
      :content="car?.images?.[0]?.image?.path_webp + '?w=300'"
    />
    <div class="car-short__image">
      <img
        class="car-short__img"
        v-if="!isPreload"
        :src="car?.images?.[0]?.image?.path_webp + '?w=300'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        v-lazy-load
        loading="lazy"
        decoding="async"
        width="264"
        height="166"
      />
      <NuxtImg
        class="car-short__img"
        v-else
        preload
        :src="car?.images?.[0]?.image?.path_webp + '?w=300'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        width="264"
        height="166"
      />
    </div>
    <div class="car-short__content">
      <div class="car-short__content_left">
        <div class="car-short__title" itemprop="name">{{ car?.title }}</div>
        <div
          class="car-short__info"
          itemprop="offers"
          itemscope
          itemtype="http://schema.org/Offer"
        >
          <meta itemprop="priceCurrency" :content="currentExchangeRate?.name" />
          <meta itemprop="price" :content="price" />
          <span>From</span>
          <del class="car-short__price-old" v-if="car?.price_special?.[0]"
            >{{ currentExchangeRate?.name }} {{ priceOld }}</del
          >
          <span class="car-short__price text-ui"
            >{{ currentExchangeRate?.name }}
            {{ formatNumber(getConvertedPrice(price)) }}</span
          >
          <span>per day</span>
        </div>
      </div>
      <img
        class="car-short__brand"
        :src="car?.generation?.model_car?.brand?.image_url + '?=w60'"
        :title="car?.generation?.model_car?.brand?.name"
        :alt="`${car?.generation?.model_car?.brand?.name} for rent`"
        v-lazy-load
        loading="lazy"
        decoding="async"
        width="40"
        height="40"
      />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  car: Object,
  isPreload: Boolean,
});

const { currentExchangeRate, getConvertedPrice } = await useExchangeRate();

const route = useRoute();

const currentCity = useState("currentCity");

const price = computed(() =>
  getConvertedPrice(
    props.car?.price_special?.[0]?.price
      ? Math.round(
          props.car?.price_special?.[0]?.price /
            props.car?.price_special?.[0]?.period
        )
      : Math.round(props.car?.price?.[0]?.price / props.car?.price?.[0]?.period)
  )
);

const priceOld = computed(() =>
  formatNumber(
    getConvertedPrice(
      props.car?.price?.[0]?.price / props.car?.price?.[0]?.period
    )
  )
);

const link = computed(() =>
  convertNameToUrl(
    `/${currentCity.value?.name}/${
      route.fullPath.split("/")[2] === "leasing" ? "leasing" : "rent"
    }/${props.car?.generation?.model_car?.brand?.name}/${
      props.car?.generation?.model_car?.name
    }/${props.car?.id}/`
  )
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

  &__brand {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
  }
}
</style>
