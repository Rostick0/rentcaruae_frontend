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
      <span class="radio__icon"></span>
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
  flex-direction: column;
  row-gap: 28px;

  &__label {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  &__icon {
    border: 2px solid var(--color-grey);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    width: 20px;
    height: 20px;

    &::before {
      background-color: var(--color-green);
      border-radius: 50%;
      content: "";
      display: inline-block;
      transition: 0.3s;
      opacity: 0;
      width: 50%;
      height: 50%;
    }
  }

  &__input:checked + &__icon {
    border-color: var(--color-green);

    &::before {
      opacity: 1;
    }
  }
}
</style>
