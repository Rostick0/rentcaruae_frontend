<template>
  <div class="car-module" v-if="car?.min_days === 1">
    <span class="d-flex">
      <amp-img src="/images-frontend/icon/arrow.svg" alt="" width="20" height="20" />
    </span>
    <span>1 day rental available</span>
  </div>
  <div class="car-module" v-if="car?.security_deposit?.price">
    <span class="d-flex">
      <amp-img src="/images-frontend/icon/arrow.svg" alt="" width="20" height="20" />
    </span>
    <span class="color-light-green">Deposit-free option</span>
  </div>
  <div class="car-module">
    <span class="d-flex">
      <amp-img src="/images-frontend/icon/arrow.svg" alt="" width="20" height="20" />
    </span>
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
    min-width: 20px;
  }
}
</style>
