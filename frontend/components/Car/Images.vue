<template>
  <div class="car-image">
    <div class="car-image__main">
      <LazyNuxtImg
        class="car-image__main_img"
        :src="activeImage?.image?.path_webp"
        decoding="async"
        loading="lazy"
        :alt="carTitle"
        fit="cover"
      />
    </div>
    <div class="car-image__list" v-if="images?.length">
      <LazyNuxtImg
        class="car-image__item"
        v-for="image in images"
        :key="image?.id"
        :src="image?.image?.path_webp"
        decoding="async"
        loading="lazy"
        :alt="carTitle"
        width="154"
        height="96"
        fit="cover"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  images: Array,
  carTitle: String,
});

const activeImage = ref(props.images?.[0]);
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
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    display: flex;
    column-gap: 10px;
    overflow: auto;
    max-width: 646px;
  }

  &__item {
    border-radius: 8px;
    flex-shrink: 0;
    object-fit: cover;
    overflow: auto;
  }
}
</style>
