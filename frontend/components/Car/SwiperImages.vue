<template>
  <Swiper
    class="car-image__swiper"
    @swiper="(swiperInit) => (swiper = swiperInit)"
    :spaceBetween="10"
    :breakpoints="{
      0: {
        slidesPerView: 1.07,
      },
      769: {
        slidesPerView: 1,
      },
    }"
  >
    <SwiperSlide>
      <LazyNuxtImg
        class="car-image__main_img"
        :src="firstImage?.image?.path_webp + '?w=700'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        preload
        decoding="async"
        loading="lazy"
      />
    </SwiperSlide>
    <SwiperSlide v-for="image in otherImages" :key="image?.id">
      <img
        class="car-image__main_img"
        :src="image?.image?.path_webp + '?w=700'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        v-lazy-load
        decoding="async"
        loading="lazy"
      />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
await import("swiper/css");

const props = defineProps({
  car: Object,
  activeSlide: Number,
  images: Array,
});

const swiper = ref();

const firstImage = computed(() => props?.images?.[0]);
const otherImages = computed(() => props?.images?.slice(0, -1));

watch(props.activeSlide, (newV) => {
  swiper.value.slideTo(newV, 200, false);
});
</script>

<style lang="scss" scoped>
.car-image {
  &__main {
    &_img {
      border-radius: 8px;
      object-fit: cover;
      // position: absolute;
      // left: 0;
      // top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__swiper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
