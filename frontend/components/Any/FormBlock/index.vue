<template>
  <div class="form-block">
    <div class="form-block__title">{{ title }}</div>
    <div class="form-block__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.form-block {
  background-color: var(--color-white);
  border-radius: 8px;
 
  &__title {
    border-bottom: 1px solid var(--color-line);
    font-weight: 500;
    padding: 20px;
    padding-bottom: 12px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 20px;
  }
}
</style>
