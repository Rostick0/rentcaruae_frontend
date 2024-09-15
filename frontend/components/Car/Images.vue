<template>
  <div class="car-image">
    <div class="car-image__main">
      <LazyClientOnly>
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
      </LazyClientOnly>
    </div>
    <div
      class="car-image__list"
      :class="{ all: isShowAll }"
      v-if="images?.length && $device?.isDesktopOrTablet"
    >
      <LazyNuxtImg
        class="car-image__item"
        v-for="(image, index) in images"
        :key="image?.id"
        :src="image?.image?.path_webp + '?w=180'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        @click="changeActiveIndex(index)"
        decoding="async"
        loading="lazy"
        width="154"
        height="96"
        fit="cover"
      />
      <button
        class="car-image__all"
        v-if="!isShowAll"
        @click="isShowAll = true"
      >
        Show <br />
        all
      </button>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const props = defineProps({
  images: Array,
  car: Object,
});

const isShowAll = ref(false);

const currentCity = useState("currentCity");

const swiper = ref();
const changeActiveIndex = (index) => swiper.value.slideTo(index, 200, false);
</script>

<style lang="scss" scoped>
.car-image {
  margin-bottom: 20px;

  &__main {
    display: flex;
    padding-top: 62%;
    margin-bottom: 16px;
    position: relative;
    width: 100%;

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

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    position: relative;
    overflow: hidden;
    max-height: 96px;
    transition: 0.3s;

    &.all {
      max-height: 1500px;
    }
    // overflow: auto;
  }

  &__item {
    border-radius: 8px;
    flex-shrink: 0;
    object-fit: cover;
    overflow: auto;
  }

  &__all {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 5%,
      rgba(0, 0, 0, 0.5) 100%
    );
    color: var(--color-white);
    border-radius: 8px;
    font-weight: 700;
    padding: 0 4px;
    position: absolute;
    top: 0;
    right: 1px;
    height: 100%;
  }
}
</style>
