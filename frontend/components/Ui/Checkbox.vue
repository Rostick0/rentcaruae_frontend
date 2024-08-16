<template>
  <UiControl :invalid="!!errorMessage" :message="errorMessage || message">
    <label class="control__checkbox checkbox" :class="[variant]">
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
          width="13"
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
      <span class="checkbox__label" v-if="$slots">
        <slot />
      </span>
    </label>
  </UiControl>
</template>

<script lang="ts" setup>
defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);

// const props = defineProps({
//   label: String,
//   modelValue: Boolean,
//   message: String,
//   placeholder: String,
//   errorMessage: String,
//   onChange: Function,
//   deps: [Array, Object, String, Number],
//   onDepsChange: {
//     type: Function,
//   },
//   forceDeps: Boolean,
//   innerConvertTo: Function,
//   withIcon: {
//     type: Boolean,
//     default: true,
//   },
//   variant: {

//   }
// });
const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue: boolean;
    message?: string;
    placeholder?: string;
    errorMessage?: string;
    onChange?: Function;
    deps?: Array<any> | Object | string | number;
    onDepsChange?: Function;
    forceDeps?: boolean;
    innerConvertTo?: Function;
    withIcon?: boolean;
    variant?: "grey-small";
  }>(),
  {
    withIcon: true,
  }
);

function handleChange(event: Event) {
  const eventTarget = event.target as HTMLInputElement;

  emits(
    "update:modelValue",
    props?.innerConvertTo?.(eventTarget.checked) ?? eventTarget.checked
  );
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  handleChange,
  updateModelValue: (value: boolean) => emits("update:modelValue", value),
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
    background-color: var(--color-basic);
    border-color: var(--color-basic);

    .checkbox__icon_svg {
      opacity: 1;
    }
  }

  &__icon {
    border: 1px solid var(--color-basic);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: 0.3s;
    width: 20px;
    height: 20px;

    &_svg {
      transition: 0.3s;
      opacity: 0;
    }
  }

  &__label {
    // color: var(--color-grey-dark);
    font-size: 14px;
    font-weight: 500;
    padding-top: 4px;
  }

  &.grey-small {
    align-items: center;
    column-gap: 8px;

    .checkbox__label {
      color: var(--color-gray-blue);
      font-size: 12px;
      padding-top: 0;
    }
  }
}
</style>

<style lang="scss">
.checkbox {
  &.grey-small {
    a {
      color: var(--color-gray-blue);
      text-decoration: underline;
    }
  }
}
</style>
