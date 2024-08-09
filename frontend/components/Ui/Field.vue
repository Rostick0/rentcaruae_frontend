<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :leftIcon="leftIcon"
    :rightIcon="rightIcon"
  >
    <template #leftIcon>
      <slot name="leftIcon"></slot>
    </template>
    <input
      v-bind="$attrs"
      :placeholder="placeholder ?? ''"
      class="control__field"
      :class="size"
      v-maska
      :data-maska="maska"
      :data-maska-tokens="maskaTokens"
      :data-maska-reversed="dataMaskaReversed"
      @change="handleChange"
      @input="handleInput"
      :value="modelValue"
    />
  </UiControl>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: [String, Number],
  invalid: Boolean,
  leftIcon: String,
  rightIcon: String,
  message: String,
  label: String,
  placeholder: String,
  maska: {
    type: [String, Array],
  },
  dataMaskaReversed: {
    type: Boolean,
    default: false,
  },
  maskaTokens: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  // small | standard | big
  size: String,
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
});

function handleInput(event) {
  emits("update:modelValue", event.target.value || undefined);
}

function handleChange(event) {
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  handleChange,
  handleInput,
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

<style lang="scss" scoped>
.control {
  &.invalid {
    .control__field {
      border-color: var(--color-red);
      color: var(--color-red);
    }
  }

  &__label {
    display: flex;
    position: relative;

    &_name {
      color: var(--color-grey-dark);
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      transition: 0.3s;
    }
  }

  &__field {
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    padding: 8px;
    padding-top: 24px;
    width: 100%;

    &:focus {
      border-color: var(--color-green);
    }
  }
}
</style>
