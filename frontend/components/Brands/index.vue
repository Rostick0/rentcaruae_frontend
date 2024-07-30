<template>
  <div class="brands__list">
    <NuxtLink class="brands__link" v-for="brand in brands" :key="brand.id">
      <LazyNuxtImg
        loading="lazy"
        :src="brand.image_url"
        :alt="brands.name"
        width="40"
        height="40"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  brands: Array,
});
</script>

<style lang="scss" scoped>
.brands {
  &__list {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 24px;
    // padding: 10px;
    // margin: -10px;
    // overflow: auto;
  }

  &__link {
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: 1px 1px 3px 1px #00000040;
    display: flex;
    padding: 16px;
  }
}
</style>
