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
// const Datepicker = await import("@vuepic/vue-datepicker");
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

  .dp__calendar_header_item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    width: 48px;
    height: 48px;
  }

  .dp__calendar_item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
  }

  .dp__pointer {
    width: 40px;
    height: 40px;
  }

  .dp__month_year_select {
    width: fit-content;

    &:last-child {
      font-weight: 700;
    }
  }

  .dp__calendar_row {
    margin: 0;
  }

  .dp__calendar_header_separator {
    display: none;
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
  // border: none;

  // border: 1px solid var(--color-grey-dark);
  // border-radius: 8px;
  // font-size: 16px;
  // font-family: Roboto, Arial, sans-serif;
  // line-height: 1;
  // padding: 20px 12px;
  // padding-left: 32px;
  // width: 100%;

  // &::placeholder {
  //   color: var(--color-grey-dark);
  // }

  &.dp__range_start,
  &.dp__range_end {
    background-color: var(--color-basic);
    border-color: var(--color-basic);
    border-radius: 8px;
    position: relative;

    // &::after {
    //   background-color: red;
    //   content: "";
    //   position: absolute;
    //   right: -9px;
    //   width: 8px;
    //   height: 40px;
    //   z-index: 0;
    // }
  }

  // &.dp__range_start {
  //   &::before {
  //     background-color: #a1d1ff;
  //     content: "";
  //     position: absolute;
  //     right: 0;
  //     width: 50%;
  //     height: 100%;
  //     z-index: -1;
  //     // z-index: -1;
  //   }
  // }

  &.dp__range_between {
    background-color: #a1d1ff;
    border-color: #a1d1ff;
  }
}
</style>
