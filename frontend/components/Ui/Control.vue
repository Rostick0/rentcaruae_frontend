<template>
  <div
    class="control"
    :class="[
      { invalid },
      { valid },
      { control__hideMessage: hideMessage },
      { isReadOnly },
      leftIcon ? 'leftIcon' : '',
      rightIcon ? 'rightIcon' : '',
    ]"
    :style="{ '--readOnlyText': `'${readOnlyText ?? 'Hide'}'` }"
  >
    <div v-if="label" class="control__label">
      {{ label }}
    </div>
    <div class="control__wrap">
      <slot />

      <div v-if="leftIcon" class="control__icon-left">
        <component :is="leftIcon" />
      </div>
      <div v-if="$slots.leftIcon" class="control__icon-left">
        <slot name="leftIcon" />
      </div>

      <div v-if="rightIcon" class="control__icon-right">
        <component :is="rightIcon" />
      </div>
      <div v-if="$slots.rightIcon" class="control__icon-right">
        <slot name="rightIcon" />
      </div>
    </div>
    <div class="control__message" v-if="message" :class="[{ show: !!message }]">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type InputHTMLAttributes } from "vue";

defineComponent({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  rightIcon?: any;
  leftIcon?: any;
  message?: any;
  invalid?: boolean;
  valid?: boolean;
  hideMessage?: boolean;
  isReadOnly?: boolean;
  readOnlyText?: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.control {
  // background: #f5f5f5;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  position: relative;
  width: 100%;

  &__label {
    background-color: #f5f5f5;
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
  }

  &__message {
    color: var(--color-red);
    font-size: 12px;
    padding-left: 12px;
  }

  &.isReadOnly {
    // filter: blur(1px);
    .control__wrap {
      position: relative;

      &::after {
        background-color: rgb(0, 0, 0, 0.25);
        color: var(--color-white);
        border-radius: 8px;
        content: var(--readOnlyText);
        cursor: not-allowed;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        // opacity: 0.1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
    }
  }
}
</style>
