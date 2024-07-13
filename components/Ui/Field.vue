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
    <label v-if="isPlaceholderTop" class="control__label">
      <input
        v-bind="$attrs"
        placeholder=""
        class="control__field control__field_placeholder-top"
        :class="size"
        v-maska
        :data-maska="maska"
        :data-maska-tokens="maskaTokens"
        :data-maska-reversed="dataMaskaReversed"
        @change="handleChange"
        @input="handleInput"
        :value="modelValue"
      />
      <span class="control__label_name">{{ placeholder }}</span>
    </label>
    <input
      v-else
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
  modelValue: String,
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
  isPlaceholderTop: Boolean,
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

  &__field:focus + &__label_name,
  &__field:not(:placeholder-shown) + &__label_name {
    font-size: 12px;
    top: 11px;
    transform: translateY(0);
  }

  &__field {
    border: 1px solid var(--color-grey-dark);
    border-radius: 8px;
    font-size: 16px;
    padding: 21px 12px;
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
