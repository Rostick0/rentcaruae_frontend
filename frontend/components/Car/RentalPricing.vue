<template>
  <div class="rental-pricing">
    <h2 class="rental-pricing__title">{{ $t("rentalPricing.title") }}</h2>
    <ul class="rental-pricing__list">
      <template v-if="isLeasing">
        <li
          class="rental-pricing__item"
          v-for="item in car?.price_leasing"
          :key="item?.id"
        >
          <span>{{ item?.period }} {{ $t("days") }}</span>
          <span
            >{{ currentExchangeRate?.name }}
            {{ formatNumber(getConvertedPrice(item?.price)) }}</span
          >
        </li>
        <li>
          <NuxtLink
            class="rental-pricing__item text-ui"
            :to="$localePath($route.fullPath.replace('leasing', 'rent'))"
          >
            <span>{{ $t("rentalPricing.ViewDailyOffer") }}</span>
            <span>1-30 {{ $t("days") }}</span>
          </NuxtLink>
        </li>
      </template>
      <template v-else>
        <li
          class="rental-pricing__item"
          v-for="item in car?.price"
          :key="item?.id"
        >
          <span>{{ item?.period }} {{ $t("days") }}</span>
          <span
            >{{ currentExchangeRate?.name }}
            {{ formatNumber(getConvertedPrice(item?.price)) }}</span
          >
        </li>
        <template v-if="car?.price_leasing?.length">
          <li>
            <NuxtLink
              class="rental-pricing__item text-ui"
              :to="$localePath($route.fullPath.replace('rent', 'leasing'))"
            >
              <span>{{ $t("rentalPricing.ViewMounthlyOffer") }}</span>
              <span>1-12 {{ $t("months") }}</span>
            </NuxtLink>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
  isLeasing: Boolean,
});

const { currentExchangeRate, getConvertedPrice } = await useExchangeRate();
</script>

<style lang="scss" scoped>
.rental-pricing {
  margin-bottom: 20px;

  &__title {
    margin-bottom: 12px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 40px;
  }

  &__item {
    background-color: var(--color-white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    row-gap: 4px;
    font-size: 12px;
    font-weight: 700;
    line-height: 0.02em;
    padding: 10px 20px 10px 8px;
  }

  @media (max-width: 1024px) {
    &__list {
      grid-gap: 16px;
    }
  }
}
</style>
