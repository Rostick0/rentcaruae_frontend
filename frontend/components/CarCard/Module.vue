<template>
  <div class="car-module" v-if="car?.min_days === 1">
    <LazyNuxtImg
      src="frontend-images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span>{{ $t('carCardModule.ƒ') }}</span>
  </div>
  <div class="car-module" v-if="car?.security_deposit?.price">
    <LazyNuxtImg
      src="frontend-images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span class="color-light-green">{{ $t('carCardModule.depositfreeOption') }}</span>
  </div>
  <div class="car-module">
    <LazyNuxtImg
      src="frontend-images/icon/arrow.svg"
      alt=""
      loading="lazy"
      width="20"
      height="20"
    />
    <span>{{ $t("carCardModule.freeDelivery") }}</span>
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
