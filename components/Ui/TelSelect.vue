<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div class="control__tel-select">
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
  searchString: String,
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
    // border-radius: 8px;
    // font-weight: 700;
    padding: 8px;
    padding-top: 24px;
    // width: 100%;
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
    // background: #f5f5f5;
    // border-radius: 8px;
    // font-weight: 700;
    // padding: 8px;
    // padding-top: 24px;
    // width: 100%;
    // background-color: var(--color-white);
    // color: var(--color-grey-dark);
    // border: 1px solid var(--color-line);
    // border-radius: 8px;
    // pointer-events: none;
    // font-size: 14px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // padding: 10px 16px;
    // padding-right: 40px;
    // width: 100%;
  }
}
</style>

<style lang="scss">
.select {
  &__field {
    .select {
    }
  }

  &-icons {
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
      order: 3;
    }
  }
}
</style>
