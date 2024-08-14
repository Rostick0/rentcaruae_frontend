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
      :class="{ time_picker: timePicker }"
      :timePicker="timePicker"
      :format="format"
      v-bind="$attrs"
      @update:model-value="handleInput"
      :modelValue="modelValue"
    />
  </UiControl>
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
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
  timePicker: Boolean,
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
.control__datepicker {
  .dp__menu {
    border: none;
    justify-content: center;
  }

  &.time_picker .dp__pointer {
    background-color: #f5f5f5;
    border-color: transparent;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    padding: 24px 32px 8px;
    // padding-top: 24px;
    width: 100%;
  }

  .dp__month_year_select {
    width: fit-content;

    &:last-child {
      font-weight: 700;
    }
  }

  .dp__calendar {
    &_item {
      flex-grow: 0;
    }

    &_row {
      margin: 0;
    }

    &_header_separator {
      display: none;
    }

    &_header_item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      width: 40px;
      height: 40px;
    }
  }

  .dp__input_icon,
  .dp__clear_icon {
    transform: translateY(24px);
    top: 0;
  }
}

.dp__flex_display {
  justify-content: center;
}

.dp__month_year_wrap {
  justify-content: center;
  column-gap: 4px;
}

.dp--arrow-btn-nav {
  display: none;
}

.dp__pointer {
  &.dp__today {
    border-radius: 8px;
  }

  &.dp__range_start,
  &.dp__range_end {
    background-color: var(--color-basic);
    border-color: var(--color-basic);
    border-radius: 8px;
    position: relative;
  }

  &.dp__range_start {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.dp__range_end {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.dp__range_between {
    background-color: #a1d1ff;
    border-color: #a1d1ff;
    border-radius: 0;
  }
}
</style>
