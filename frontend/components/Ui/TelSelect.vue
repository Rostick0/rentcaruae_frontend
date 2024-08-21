<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div class="control__tel-select tel-select">
      <label class="tel-select__field">
        <UiSelectWithIcons
          v-model="phone"
          :options="optionsNumbers"
          closeAfterSelect
        />
        <input
          class="tel-select__value"
          v-model="phoneText"
          type="text"
          v-maska
          data-maska="### ### ## ##"
        />
      </label>
    </div>
  </UiControl>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  rightIcon: String,
  errorMessage: String,
  message: String,
  label: String,
  searchString: [String, Number],
  placeholder: String,
  modelValue: {
    type: Array,
    default: ["", ""],
  },
});

const phone = ref(props.modelValue?.[0] ?? optionsNumbers[0]);
const phoneText = ref(props.modelValue?.[1]);

watch(
  () => [phone.value, phoneText.value],
  () => {
    emits("update:modelValue", [phone.value?.name, phoneText.value]);
  }
);
</script>

<style lang="scss" scoped>
.tel-select {
  cursor: pointer;
  position: relative;

  &__field {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 8px;
    padding-top: 24px;
    display: flex;
    column-gap: 4px;
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;

    &::placeholder {
      line-height: 1.3;
    }
  }

  &__value {
    background-color: transparent;
    flex-grow: 1;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>

<style lang="scss">
.tel-select {
  .select-icons {
    &-switch {
      &__icon {
        order: 1;
      }

      &__arrow {
        order: 2;

        path {
          fill: var(--color-text100);
        }
      }
    }

    &__value {
      color: var(--color-text100);
      order: 3;
    }
  }
}
</style>
