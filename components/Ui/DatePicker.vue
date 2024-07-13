<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <Datepicker
      :placeholder="placeholder"
      class="control__datepicker"
      :format="format"
      v-bind="$attrs"
      @update:model-value="handleInput"
      :modelValue="modelValue"
    />
  </UiControl>
</template>

<script setup>
const Datepicker = await import("@vuepic/vue-datepicker");
await import("@vuepic/vue-datepicker/dist/main.css");

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: [Date, String, Number, Object],
  invalid: Boolean,
  rightIcon: String,
  message: String,
  label: String,
  placeholder: String,
  maska: String,
  dataMaskaReversed: Boolean,
  maskaTokens: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
  format: {
    type: Function,
    defaultValue: (date) => {
      if (!date) {
        return;
      }
      return `${date?.getDate()}/${
        date?.getMonth() + 1
      }/${date?.getFullYear()}`;
    },
  },
});

function handleInput(date) {
  emits("update:modelValue", date || undefined);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  updateModelValue: (value) => emits("update:modelValue", value),
}));

watch(
  () => props.deps,
  (cur, prev) => {
    if (
      Array.isArray(prev)
        ? prev.find((item) => item !== undefined)
        : prev !== undefined
    ) {
      props?.onDepsChange?.(ctx.value);
    }
  },
  {
    deep: true,
    immediate: props.forceDeps,
  }
);
</script>

<style lang="scss">
.dp__pointer {
  border: 1px solid var(--color-grey-dark);
  border-radius: 8px;
  font-size: 16px;
  font-family: Roboto, Arial, sans-serif;
  line-height: 1;
  padding: 20px 12px;
  padding-left: 32px;
  width: 100%;

  &::placeholder {
    color: var(--color-grey-dark);
  }
}
</style>
