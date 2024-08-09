<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <textarea
      class="control__textarea"
      v-bind="$attrs"
      v-maska
      :data-maska="maska"
      :data-maska-tokens="maskaTokens"
      :data-maska-reversed="dataMaskReserved"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value || undefined
        )
      "
      :value="modelValue"
    ></textarea>
  </UiControl>
</template>

<script setup lang="ts">
import { type TextareaHTMLAttributes } from "vue";

export interface FieldProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  modelValue?: string;
  invalid?: boolean;
  rightIcon?: any;
  message?: string;
  label?: string;
  maska?: any;
  dataMaskReserved?: boolean;
  maskaTokens?: any;
  errorMessage?: string;
  // rows?: string | number;
}

interface Emits {
  (event: "update:modelValue", value?: string): void;
}

defineEmits<Emits>();
defineProps<FieldProps>();
</script>

<style lang="scss" scoped>
.control {
  &.invalid {
    .control__textarea {
      border-color: var(--color-red);
      color: var(--color-red);
    }
  }

  &__textarea {
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    padding: 8px;
    padding-top: 24px;
    width: 100%;
    min-height: 51px;

    &:focus {
      border-color: var(--color-green);
    }
  }
}
</style>
