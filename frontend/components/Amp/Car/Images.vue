<template>
  <div class="car-image">
    <div class="car-image__main">
      <amp-carousel class="car-image__carousel" type="carousel" role="region">
        <amp-img
          v-for="image in images"
          :key="image?.id"
          class="car-image__main_img"
          :src="image?.image?.path_webp + '?w=560'"
          :title="getCarImageTitle(car, currentCity)"
          :alt="getCarImageAlt(car, currentCity)"
          width="390"
          height="241"
          layout="responsive"
        />
      </amp-carousel>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  images: Array,
  car: Object,
});

const currentCity = useState("currentCity");
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
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      img {
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }

  &__carousel {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
