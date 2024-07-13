<template>
  <div class="radio">
    <label v-for="item in radios" :key="item.name" class="radio__label">
      <input
        class="radio__input"
        type="radio"
        :value="item.value"
        :name="name"
        @change="handleChange"
        :checked="modelValue === item.value"
        hidden
      />
      <span class="radio__value">{{ item.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: [Number, String],
  name: String,
  radios: Array,
});

function handleChange(event) {
  emits(
    "update:modelValue",
    props?.innerConvertTo?.(event.target.value) ?? event.target.value
  );
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
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
.radio {
  display: flex;

  &__label {
    flex-grow: 1;

    &:first-child {
      border-radius: 8px 0 0 8px;
    }

    &:last-child {
      border-radius: 0 8px 8px 0;

      .radio__value {
        border-right-width: 1px;
      }
    }
  }

  &__input:checked + &__value {
    background: #00963940;
    color: var(--color-black);
    border-color: var(--color-green);
  }

  &__value {
    border: 1px solid var(--color-line);
    border-radius: inherit;
    border-right-width: 0;
    color: var(--color-grey-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: 0.3s;
    padding: 10px 16px;
    height: 100%;
  }
}
</style>
