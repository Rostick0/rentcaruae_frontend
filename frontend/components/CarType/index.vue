<template>
  <div class="car-type__list">
    <UiButton
      class="car-type__item"
      @click="emits('update:modelValue', '')"
      :variant="!modelValue ? 'standard' : 'outlined'"
    >
      All Cars
    </UiButton>
    <UiButton
      v-for="type in generations"
      :key="type.name"
      class="car-type__item text-pre-small"
      :class="{ active: modelValue === type.name.toLowerCase() }"
      @click="emits('update:modelValue', type.name.toLowerCase())"
      :variant="
        modelValue === type.name.toLowerCase() ? 'standard' : 'outlined'
      "
    >
      <img
        :src="type.img"
        :alt="type.name"
        v-lazy-load
        loading="lazy"
        decoding="async"
        width="52"
        height="26"
      />
      <span>{{ type.name }}</span>
    </UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  generations: Array,
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.car-type {
  &__list {
    display: flex;
    column-gap: 12px;
    overflow: auto;
    margin-bottom: 20px;
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 4px;
    flex-shrink: 0;
    font-weight: 700;
    padding: 7px 7.75px;

    &.outlined {
      color: var(--color-black);
    }

    &:first-child {
      padding: 12px 15px;
    }
  }
}
</style>
