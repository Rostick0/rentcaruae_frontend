<template>
  <div class="car-module" v-if="!car?.security_deposit?.price">
    <LazyNuxtImg
      src="images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span>Deposit-free option</span>
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
