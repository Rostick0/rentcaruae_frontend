<template>
  <div class="car">
    <div class="car__top">
      <div class="car__title">{{ car?.title }}</div>
      <LazyNuxtImg
        :src="car?.make?.path"
        loading="lazy"
        :alt="car?.make?.name"
        width="40"
        height="40"
      />
    </div>
    <div class="car__image">
      <LazyNuxtImg
        class="car__img"
        :src="car?.image?.path"
        decoding="async"
        loading="lazy"
        :alt="car?.title"
        fit="cover"
        width="320"
        height="196"
      />
    </div>
    <CarCardInfo :car="car" />
    <div class="car__stats">
      <div class="car-stat">
        <div class="car-stat__title">Deposit</div>
        <div class="car-stat__value" :class="{ free: !car?.deposite }">
          {{ car?.deposite ?? "Free" }}
        </div>
      </div>
      <div class="car-stat__hr"></div>
      <div class="car-stat">
        <div class="car-stat__title">Mileage day/mo</div>
        <div class="car-stat__value">
          {{ car?.mileage_day }} <span class="car-stat__value_km">km</span> /
          {{ car?.mileage_month }} <span class="car-stat__value_km">km</span>
        </div>
      </div>
      <div class="car-stat__hr"></div>
      <div class="car-stat">
        <div class="car-stat__title">Minimum</div>
        <div class="car-stat__value">
          {{ car?.min_days }} {{ car?.min_days > 1 ? "days" : "day" }}
        </div>
      </div>
    </div>
    <div class="car__params">
      <div class="car__params_left">
        <div
          class="car-module"
          v-for="moduleItem in car?.modules"
          :key="moduleItem"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.33329 13.25L3.83329 9.75001L2.66663 10.9167L7.33329 15.5833L17.3333 5.58334L16.1666 4.41667L7.33329 13.25Z"
              fill="#221EE3"
            />
          </svg>
          <span>{{ moduleItem }}</span>
        </div>
      </div>
      <div class="car__params_right">
        <div class="car-price">
          <div class="car-price__old">
            <span>Daily</span>
            <del class="del">AED {{ formatNumber(car?.price_daily_old) }}</del>
          </div>
          <div class="car-price__current">
            AED {{ formatNumber(car?.price_daily) }}
          </div>
        </div>
        <div class="car-price">
          <div class="car-price__old">
            <span>Monthly</span>
            <del class="del">AED {{ formatNumber(+car?.price_month_old) }}</del>
          </div>
          <div class="car-price__current">
            AED {{ formatNumber(+car?.price_month) }}
          </div>
        </div>
      </div>
    </div>
    <UiButton class="car__btn">Rent now</UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>

<style lang="scss" scoped>
.car {
  background-color: var(--color-white);
  border-radius: 8px;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &-module {
    display: flex;
    align-items: center;
    column-gap: 4px;

    svg {
      flex-shrink: 0;
    }
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

  &__btn {
    width: 100%;
  }
}
</style>
