<template>
  <button class="btn" v-bind="$attrs" :class="[color, variant]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes } from "vue";

defineComponent({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: "standard" | "outlined";
  // color?: "grey" | "grey-dark";
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.btn {
  background-color: var(--color-basic);
  color: var(--color-white);
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 16px;
  padding: 12px 16px;

  &.outlined {
    background-color: transparent;
    color: var(--color-basic);
    border-color: var(--color-basic);
  }

  // &.grey {
  //   background-color: var(--color-grey);

  //   &-dark {
  //     background-color: var(--color-grey-dark);
  //   }
  // }
}
</style>
