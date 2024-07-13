<template>
  <UiControl :invalid="!!errorMessage" :message="errorMessage || message">
    <label class="control__checkbox checkbox">
      <input
        v-bind="$attrs"
        class="checkbox__input"
        type="checkbox"
        :checked="modelValue"
        @input="handleChange"
      />
      <span v-if="withIcon" class="checkbox__icon">
        <svg
          class="checkbox__icon_svg"
          width="80%"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 1L6 12L1 7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="checkbox__label" v-if="label">
        {{ label }}
      </span>
    </label>
  </UiControl>
</template>
<script setup>
defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  label: String,
  modelValue: [Boolean, Number, String],
  message: String,
  placeholder: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
  innerConvertTo: Function,
  withIcon: {
    type: Boolean,
    default: true,
  },
});

function handleChange(event) {
  emits(
    "update:modelValue",
    props?.innerConvertTo?.(event.target.checked) ?? event.target.checked
  );
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  handleChange,
  handleChange,
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
.checkbox {
  display: flex;
  column-gap: 4px;
  transition: 0.3s;

  &__input {
    display: none;
  }

  &__input:checked + &__icon {
    background-color: var(--color-green);
    border-color: var(--color-green);

    .checkbox__icon_svg {
      opacity: 1;
    }
  }

  &__icon {
    border: 1px solid var(--color-line);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: 0.3s;
    width: 24px;
    height: 24px;

    &_svg {
      transition: 0.3s;
      opacity: 0;
    }
  }

  &__label {
    color: var(--color-grey-dark);
    font-size: 14px;
    font-weight: 500;
    padding-top: 4px;
  }
}
</style>
