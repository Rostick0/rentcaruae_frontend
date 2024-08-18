<template>
  <div class="car">
    <div class="car__top">
      <div class="car__title">{{ car?.title }}</div>
      <LazyNuxtImg
        :src="
          $config.public.BACK_URL + car?.generation?.model_car?.brand?.image_url
        "
        loading="lazy"
        :alt="car?.generation?.model_car?.brand?.name"
        width="40"
        height="40"
      />
    </div>
    <div class="car__image">
      <LazyNuxtImg
        class="car__img"
        :src="car?.images?.[0]?.image?.path_webp + '?w=320'"
        decoding="async"
        loading="lazy"
        :alt="car?.title"
        width="320"
        height="196"
      />
    </div>
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
          {{ car?.price?.[1]?.mileage }}
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
        <div class="car-price">
          <div class="car-price__old">
            <span>Daily</span>
            <del class="del" v-if="car?.price_special?.[0]"
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
            <del class="del" v-if="car?.price_special?.[1]"
              >AED {{ formatNumber(car?.price?.[1]?.price) }}</del
            >
          </div>
          <div class="car-price__current">
            AED
            {{
              formatNumber(
                car?.price_special?.[1]?.price ?? car?.price?.[1]?.price
              )
            }}
          </div>
        </div>
      </div>
    </div>
    <NuxtLink
      class="d-flex car__link"
      :to="
        convertNameToUrl(
          `/${city?.name}/${route.fullPath.split('/')[2] ?? 'economy'}/${
            car?.generation?.model_car?.brand?.name
          }/${car?.generation?.model_car?.name}/${car?.id}`
        )
      "
    >
      <UiButton class="car__btn">Rent now</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const city = useState("currentCity");

const route = useRoute();
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
