<template>
  <div class="car-module" v-if="car?.min_days === 1">
    <LazyNuxtImg
      src="frontend-images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span>1 day rental available</span>
  </div>
  <div class="car-module" v-if="car?.security_deposit?.price">
    <LazyNuxtImg
      src="frontend-images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span class="color-light-green">Deposit-free option</span>
  </div>
  <div class="car-module">
    <LazyNuxtImg
      src="frontend-images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span>Free delivery</span>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>

<style lang="scss" scoped>
.car-module {
  display: flex;
  align-items: center;
  column-gap: 4px;

  img {
    flex-shrink: 0;
  }
}
</style>
