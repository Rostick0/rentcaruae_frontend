<template>
  <div class="post-categories">
    <NuxtLink
      class="d-flex"
      v-for="category in postCategories"
      :key="category.id"
      :to="`/amp/blogs?filterEQ[post_category_id]=${category.id}`"
    >
      <UiButton
        class="post-categories__btn"
        :class="{ active: category.id == modelValue }"
      >
        {{ category.name }}
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
});
</script>

<style lang="scss" scoped>
.post-categories {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
  margin-bottom: 12px;

  &__btn {
    // background-color: var(--color-basic);
    // color: var(--color-white);
    border-radius: 30px;
    font-size: 14px;
    padding: 4px 12px;

    &.active {
      opacity: 0.5;
    }
  }
}
</style>
