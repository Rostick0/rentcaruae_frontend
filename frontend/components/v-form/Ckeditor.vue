<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <UiCkeditor
      :modelValue="modelValue"
      @update:modelValue="(val) => emits('update:modelValue', val)"
      :placeholder="placeholder"
    />
  </UiControl>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  invalid?: boolean;
  rightIcon?: any;
  message?: string;
  label?: string;
  maska?: any;
  dataMaskReserved?: boolean;
  maskaTokens?: any;
  errorMessage?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);
</script>
