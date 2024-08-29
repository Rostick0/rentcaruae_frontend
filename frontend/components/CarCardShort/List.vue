<template>
  <div class="car-list">
    <div class="car-list__top">
      <h2 class="car-list__title">{{ title }}</h2>
      <LinkMore :name="linkText" :to="link" />
    </div>
    <div class="car-list__cars">
      <LazyCarCardShortItem v-for="car in cars" :key="car?.id" :car="car" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cars: Array,
  title: String,
  linkText: String,
  link: String,
});
</script>

<style lang="scss" scoped>
.car-list {
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    min-height: 44px;
  }

  &__cars {
    display: grid;
    grid-template-columns: repeat(4, 264px);
    grid-gap: 24px;
    overflow: auto;
  }
}
</style>
