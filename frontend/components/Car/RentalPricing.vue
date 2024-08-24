<template>
  <div class="rental-pricing">
    <h2 class="rental-pricing__title">Rental pricing</h2>
    <ul class="rental-pricing__list">
      <template v-if="isLeasing">
        <li
          class="rental-pricing__item"
          v-for="item in car?.price_leasing"
          :key="item?.id"
        >
          <span>{{ item?.period }} Days</span>
          <span>AED {{ formatNumber(item?.price) }}</span>
        </li>
        <li>
          <NuxtLink
            class="rental-pricing__item text-ui"
            :to="$route.fullPath.replace('leasing', 'rent')"
          >
            <span>View daily offer</span>
            <span>1-30 days</span>
          </NuxtLink>
        </li>
      </template>
      <template v-else>
        <li
          class="rental-pricing__item"
          v-for="item in car?.price"
          :key="item?.id"
        >
          <span>{{ item?.period }} Days</span>
          <span>AED {{ formatNumber(item?.price) }}</span>
        </li>
        <template v-if="car?.price_leasing">
          <li>
            <NuxtLink
              class="rental-pricing__item text-ui"
              :to="$route.fullPath.replace('rent', 'leasing')"
            >
              <span>View mounthly offer</span>
              <span>1-12 months</span>
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
</script>

<style lang="scss" scoped>
.rental-pricing {
  margin-bottom: 20px;

  &__title {
    margin-bottom: 12px;
  }

  &__list {
    display: flex;
    grid-gap: 40px;
  }

  &__item {
    background-color: var(--color-white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    font-size: 12px;
    font-weight: 700;
    line-height: 0.02em;
    padding: 10px 20px 10px 8px;
  }
}
</style>
