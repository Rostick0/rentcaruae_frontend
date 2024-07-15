<template>
  <div class="car-short">
    <div class="car-short__image">
      <LazyNuxtImg
        class="car-short__img"
        :src="car?.image?.path"
        loading="lazy"
        :alt="car?.title"
        width="264"
        height="166"
      />
    </div>
    <NuxtLink class="car-short__content" to="/">
      <div class="car-short__content_left">
        <div class="car-short__title">{{ car?.title }}</div>
        <div class="car-short__info">
          From
          <del class="car-short__price-old" v-if="car?.price_old"
            >AED {{ car?.price_old }}</del
          >&nbsp;<span class="car-short__price text-ui"
            >AED {{ car?.price }}</span
          >
          per day
        </div>
      </div>
      <LazyNuxtImg
        class="car-short__icon"
        :src="car?.make?.path"
        loading="lazy"
        width="44"
        height="44"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
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
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    padding: 8px;
    padding-right: 4px;
  }

  &__title {
    font-size: 14px;
    margin-bottom: 2px;
  }

  &__info {
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
