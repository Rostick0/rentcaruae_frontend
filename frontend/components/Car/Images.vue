<template>
  <div class="car-image">
    <div class="car-image__main">
      <ClientOnly>
        <CarSwiperImages
          :activeSlide="activeSlide"
          :car="car"
          :images="images"
        />
      </ClientOnly>
    </div>
    <div
      class="car-image__list"
      :class="{ all: isShowAll }"
      v-if="images?.length && $device?.isDesktopOrTablet"
    >
      <img
        class="car-image__item"
        v-for="(image, index) in images"
        :key="image?.id"
        :src="image?.image?.path_webp + '?w=180'"
        :title="getCarImageTitle(car, currentCity)"
        :alt="getCarImageAlt(car, currentCity)"
        @click="activeSlide = index"
        v-lazy-load
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
const props = defineProps({
  images: Array,
  car: Object,
});

const isShowAll = ref(false);

const currentCity = useState("currentCity");

const activeSlide = ref();
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
