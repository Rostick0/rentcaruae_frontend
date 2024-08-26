<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div class="control__tel-select tel-select">
      <label class="tel-select__field">
        <!-- <UiSelectWithIcons
          v-model="phone"
          :options="optionsNumbers"
          closeAfterSelect
        /> -->
        <TelInput
          @update:modelValue="updatePhone"
          :modelValue="modelValue"
          defaultCountry="ae"
          :dropdownOptions="{ showFlags: true, showDialCodeInList: true }"
          :inputOptions="{
            maxlength: 19,
          }"
        />
        <!-- <input
          class="tel-select__value"
          v-model="phoneText"
          type="text"
          v-maska
          data-maska="### ### ## ##"
        /> -->
      </label>
    </div>
  </UiControl>
</template>

<script setup>
import debounce from "lodash/debounce";
import { VueTelInput as TelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  rightIcon: String,
  errorMessage: String,
  message: String,
  label: String,
  searchString: [String, Number],
  placeholder: String,
  modelValue: {
    type: String,
    default: "",
  },
});

const updatePhone = (val) =>
  emits("update:modelValue", convertPhoneToForm(val));

// const phone = ref(props.modelValue?.[0] ?? optionsNumbers[0]);
// const phoneText = ref(props.modelValue?.[1]);

// watch(
//   () => [phone.value, phoneText.value],
//   () => {
//     emits("update:modelValue", [phone.value?.name, phoneText.value]);
//   }
// );
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
  .vue-tel-input {
    border: none;
    box-shadow: none;
    width: 100%;
  }

  .vti {
    &__selection {
      margin-left: -2px;
    }

    &__dropdown {
      padding: 0;

      &-arrow {
        border-left: 2px solid;
        border-bottom: 2px solid;
        border-color: var(--color-text100);
        color: transparent;
        transform: rotate(-45deg);
        margin-top: -2px;
        width: 8px;
        height: 8px;
      }
    }

    &__input {
      background: transparent;
      font-size: 16px;
      font-weight: 700;
      padding-left: 6px;
      width: 100%;
    }

    &__flag {
      box-shadow: none;
      margin-left: 0;
      margin-right: 8px;
      transform: scale(0.8);
      // width: 16px;
      // height: 14px;
    }
  }

  // .select-icons {
  //   &-switch {
  //     &__icon {
  //       order: 1;
  //     }

  //     &__arrow {
  //       order: 2;

  //       path {
  //         fill: var(--color-text100);
  //       }
  //     }
  //   }

  //   &__value {
  //     color: var(--color-text100);
  //     order: 3;
  //   }
  // }
}
</style>
