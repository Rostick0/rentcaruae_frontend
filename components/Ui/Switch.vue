<template>
  <div class="switch" @click="emits('update:modelValue', !modelValue)">
    <div class="switch__icon" :class="{ active: modelValue }">
      <div class="switch__icon_circle"></div>
    </div>
    <div class="switch__label">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  label: String,
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  align-items: center;
  column-gap: 10px;

  &__icon {
    border: 1px solid var(--color-basic);
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    transition: 0.3s;
    width: 40px;
    height: 20px;

    &.active {
      background-color: var(--color-basic);

      .switch__icon_circle {
        background-color: var(--color-white);
        left: calc(100% - 3px);
        transform: translateX(-100%);
      }
    }

    &_circle {
      background-color: var(--color-basic);
      border-radius: 50%;
      transition: 0.3s;
      position: absolute;
      left: 3px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
