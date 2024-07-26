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
  color?: "whatsapp";
}

defineProps<Props>();
</script>

<style lang="scss">
.btn {
  background-color: var(--color-basic);
  color: var(--color-white);
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
  padding: 11px 16px;

  &:hover {
    background-color: var(--color-basic-hover);
  }

  &.outlined {
    background-color: transparent;
    color: var(--color-basic);
    border-color: var(--color-basic);

    .svg-fill {
      fill: var(--color-basic);
    }
  }

  &.whatsapp {
    background: #2cb742;
  }
}
</style>
