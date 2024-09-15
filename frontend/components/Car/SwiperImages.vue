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
    <SwiperSlide v-for="image in images" :key="image?.id">
      <LazyNuxtImg
        class="car-image__main_img"
        :src="image?.image?.path_webp + '?w=700'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        decoding="async"
        loading="lazy"
        fit="cover"
      />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const props = defineProps({
  car: Object,
  activeSlide: Number,
  images: Array,
});

const swiper = ref();

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
