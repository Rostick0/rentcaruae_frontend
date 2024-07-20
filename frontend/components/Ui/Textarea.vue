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
  // &__label {
  //   display: flex;
  //   position: relative;

  //   &_name {
  //     color: var(--color-grey-dark);
  //     position: absolute;
  //     top: 50%;
  //     left: 12px;
  //     transform: translateY(-50%);
  //     transition: 0.3s;
  //   }
  // }

  // &__field:focus + &__label_name,
  // &__field:not(:placeholder-shown) + &__label_name {
  //   font-size: 12px;
  //   top: 11px;
  //   transform: translateY(0);
  // }
  &.invalid {
    .control__textarea {
      border-color: var(--color-red);
      color: var(--color-red);
    }
  }

  &__textarea {
    border: 1px solid var(--color-grey-dark);
    border-radius: 8px;
    font-size: 16px;
    padding: 10px 8px;
    width: 100%;

    &:focus {
      border-color: var(--color-green);
    }

    &_placeholder-top {
      padding: 30px 12px 10px;
    }
  }
}
</style>
