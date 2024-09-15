<template>
  <div class="car-type__list">
    <NuxtLink class="d-flex">
      <UiButton
        class="car-type__item"
        @click="emits('update:modelValue', '')"
        :variant="!modelValue ? 'standard' : 'outlined'"
      >
        All Cars
      </UiButton>
    </NuxtLink>
    <NuxtLink class="d-flex" v-for="type in bodyTypesWithIcon" :key="type.name">
      <UiButton
        class="car-type__item text-pre-small"
        :class="{ active: modelValue === type.name.toLowerCase() }"
        :variant="
          modelValue === type.name.toLowerCase() ? 'standard' : 'outlined'
        "
      >
        <div class="d-flex">
          <amp-img
            :src="`/${type.img}`"
            :alt="type.name"
            width="52"
            height="26"
          />
        </div>
        <div>{{ type.name }}</div>
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});
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
