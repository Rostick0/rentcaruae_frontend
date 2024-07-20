<template>
  <div class="rental-pricing">
    <h2 class="rental-pricing__title">Rental pricing</h2>
    <ul class="rental-pricing__list">
      <li class="rental-pricing__item" v-for="item in prices" :key="item?.id">
        <span
          >{{ item?.min }}{{ item?.max ? " - " + item?.max : "+" }} Days</span
        >
        <span>AED {{ item?.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  prices: Array,
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
