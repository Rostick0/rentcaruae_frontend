<template>
  <div class="car">
    <div class="car__top">
      <div class="car__title">{{ car?.title }}</div>
      <LazyNuxtImg
        :src="
          $config.public.BACK_URL + car?.generation?.model_car?.brand?.image_url
        "
        loading="lazy"
        :title="car?.generation?.model_car?.brand?.name"
        :alt="`${car?.generation?.model_car?.brand?.name} for rent`"
        width="40"
        height="40"
      />
    </div>
    <NuxtLink class="car__image" :to="link">
      <LazyNuxtImg
        class="car__img"
        :src="
          car?.images?.[0]?.image?.path_webp +
          (car?.images?.[0]?.image?.path_webp?.startsWith('blob')
            ? ''
            : '?w=350')
        "
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car)"
        decoding="async"
        loading="lazy"
        width="320"
        height="196"
      />
    </NuxtLink>
    <CarCardInfo :car="car" />
    <div class="car__stats">
      <div class="car-stat">
        <div class="car-stat__title">Deposit</div>
        <div
          class="car-stat__value"
          :class="{ free: !car?.security_deposit?.price }"
        >
          {{ car?.security_deposit?.price ?? "Free" }}
        </div>
      </div>
      <div class="car-stat__hr"></div>
      <div class="car-stat">
        <div class="car-stat__title">Mileage day/mo</div>
        <div class="car-stat__value">
          {{ car?.price?.[0]?.mileage }}
          <span class="car-stat__value_km">km</span> /
          {{ car?.price?.[2]?.mileage }}
          <span class="car-stat__value_km">km</span>
        </div>
      </div>
      <div class="car-stat__hr"></div>
      <div class="car-stat">
        <div class="car-stat__title">Minimum</div>
        <div class="car-stat__value">
          {{ car?.min_days ?? 1 }} {{ pluralize("day", car?.min_days) }}
        </div>
      </div>
    </div>
    <div class="car__params">
      <div class="car__params_left">
        <CarCardModule :car="car" />
      </div>
      <div class="car__params_right">
        <template v-if="isLeasing">
          <div class="car-price">
            <div class="car-price__old">
              <span>Monthly</span>
              <del class="color-red" v-if="car?.price_leasing?.length"
                >AED {{ formatNumber(car?.price_leasing?.[0]?.price) }}</del
              >
            </div>
            <div class="car-price__current">
              AED
              {{ formatNumber(priceLeasingMaxPeriod?.price) }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="car-price">
            <div class="car-price__old">
              <span>Daily</span>
              <del class="color-red" v-if="car?.price_special?.[0]?.price"
                >AED {{ formatNumber(car?.price?.[0]?.price) }}</del
              >
            </div>
            <div class="car-price__current">
              AED
              {{
                formatNumber(
                  car?.price_special?.[0]?.price ?? car?.price?.[0]?.price
                )
              }}
            </div>
          </div>
          <div class="car-price">
            <div class="car-price__old">
              <span>Monthly</span>
              <del class="color-red" v-if="car?.price_special?.[2]?.price"
                >AED {{ formatNumber(car?.price?.[2]?.price) }}</del
              >
            </div>
            <div class="car-price__current">
              AED
              {{
                formatNumber(
                  car?.price_special?.[2]?.price ?? car?.price?.[2]?.price
                )
              }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <NuxtLink class="d-flex car__link" :to="link">
      <UiButton class="car__btn">Rent now</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
import last from "lodash/last.js";

const props = defineProps({
  car: Object,
  isLeasing: Boolean,
});

const currentCity = useState("currentCity");
const route = useRoute();

const link = computed(() =>
  convertNameToUrl(
    `/${currentCity?.name}/${
      route.fullPath.split("/")[2] === "leasing" ? "leasing" : "rent"
    }/${props.car?.generation?.model_car?.brand?.name}/${
      props.car?.generation?.model_car?.name
    }/${props.car?.id}`
  )
);

const priceLeasingMaxPeriod = computed(() => last(props.car?.price_leasing));
</script>

<style lang="scss" scoped>
.car {
  background-color: var(--color-white);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 20px;
  padding-top: 6px;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 4px;
    margin-bottom: 4px;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
  }

  &__image {
    display: flex;
    padding-top: 62%;
    margin-bottom: 20px;
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

  &__stats {
    background-color: #f9f9fb;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 25px;
  }

  &-stat {
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 4px;
    padding: 8px;

    &__title {
      font-size: 12px;
    }

    &__value {
      font-size: 16px;
      font-weight: 700;

      &.free {
        color: #1b7e55;
      }

      &_km {
        font-size: 14px;
        font-weight: 500;
      }
    }

    &__hr {
      background-color: var(--color-text100);
      content: "";
      display: inline-block;
      align-self: center;
      width: 1px;
      height: 16px;
    }
  }

  &__params {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 8px;
    margin-bottom: 24px;

    &_left {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }

    &_right {
      display: flex;
      flex-direction: column;
      row-gap: 18px;
    }
  }

  &-price {
    text-align: right;
    font-weight: 700;

    &__old {
      display: flex;
      justify-content: flex-end;
      column-gap: 7px;
      font-size: 12px;
      margin-bottom: 2px;
    }

    &__current {
      color: var(--color-basic);
      font-size: 20px;
    }
  }

  &__link {
    margin-top: auto;
  }

  &__btn {
    width: 100%;
  }
}
</style>
