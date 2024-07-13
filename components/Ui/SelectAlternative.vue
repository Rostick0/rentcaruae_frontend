<template>
  <div>
    <UiControl
      :label="label"
      :hideMessage="hideMessage"
      :invalid="!!errorMessage"
      :message="errorMessage || message"
      :rightIcon="rightIcon"
    >
      <div @focusout="onFocusout" ref="wrapper" class="select">
        <div
          v-if="!isHideInput"
          @keydown.enter="!alwaysOpen && (isOpened = !isOpened)"
          class="select__field"
          tabindex="0"
          :class="{ select__active: isOpened }"
          @click="!alwaysOpen && toggle()"
        >
          <template v-if="isSearchable">
            <input
              v-bind="$attrs"
              class="control__field control__field_placeholder-top select__value"
              :placeholder="isPlaceholderTop ? '' : placeholder"
              :class="{
                control__field_placeholder_top: isPlaceholderTop,
              }"
              ref="inputRef"
              @input="onInput"
              :value="searchString"
              type="text"
            />
            <span v-if="isPlaceholderTop" class="control__label_name">{{
              placeholder
            }}</span>
          </template>
          <template v-else>
            <input
              class="control__field control__field_placeholder-top select__value control__field_placeholder-no-focus"
              :class="{
                control__field_placeholder_top: isPlaceholderTop,
              }"
              :placeholder="isPlaceholderTop ? '' : placeholder"
              :value="model?.value ?? model?.name ?? model?.title"
              readonly
            />
            <span v-if="isPlaceholderTop" class="control__label_name">{{
              placeholder
            }}</span>
          </template>
          <svg
            v-if="withIcon"
            class="select__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="var(--color-grey-dark)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </UiControl>
    <div
      class="select__options"
      :class="{
        select__options_color: isColour,
      }"
      v-show="alwaysOpen || isHideInput || isOpened"
      ref="selectRef"
      @mousedown.prevent
    >
      <template v-if="options?.length">
        <div
          class="options__item"
          v-for="option in options"
          :key="option.id"
          @mousedown="handleSelect(option)"
          :class="{ selected: option?.id == model?.id }"
        >
          <component v-if="componentOption" :is="componentOption" :="option" />
          <template v-else>
            {{ option?.value ?? option?.name ?? option?.title }}
          </template>
        </div>
        <div
          v-if="page < totalPages"
          class="link options__item options__item_more"
          @click="addMore"
        >
          Show more
        </div>
      </template>
      <template v-else>
        <div class="options__notfound">No results</div>
      </template>
    </div>
  </div>
</template>

<script setup>
const selectRef = ref();
const props = defineProps({
  rightIcon: [String, Object, Array],
  errorMessage: String,
  message: String,
  label: String,
  searchString: String,
  isSearchable: Boolean,
  alwaysOpen: {
    type: Boolean,
    default: false,
  },
  closeAfterSelect: {
    type: Boolean,
    default: true,
  },
  hideMessage: Boolean,
  modelValue: {
    type: [Object, Number, String, Array],
  },
  options: Array,
  placeholder: [String, Number],
  modelValueIsNumber: {
    default: false,
    type: Boolean,
  },
  isPlaceholderTop: {
    default: false,
    type: Boolean,
  },
  withIcon: {
    default: true,
    type: Boolean,
  },
  isHideInput: {
    default: false,
    type: Boolean,
  },
  componentOption: {
    type: [Object, null],
  },
  isColour: {
    default: false,
    type: Boolean,
  },
  page: {
    type: Number,
  },
  totalPages: {
    type: Number,
  },
});
const emits = defineEmits(["scrolledTop", "scrolledBottom"]);

if (props.isHideInput) {
  emits("update:searchString", null);
}

const model = computed({
  get() {
    if (!props.modelValue) return;

    if (props.modelValueIsNumber) {
      const option = props.options.find((i) => i.id == props.modelValue);
      return {
        id: props.modelValue,
        value: option?.value ?? option?.name ?? option?.title,
      };
    }
    return props.modelValue;
  },
  set(_value) {
    if (!_value) {
      return emits("update:modelValue", null);
    }

    if (props.modelValueIsNumber) {
      if (props.modelValue === _value?.id) {
        emits("update:searchString", null);
        return emits("update:modelValue", null);
      }

      return emits("update:modelValue", _value.id);
    }

    if (props.modelValue?.id === _value?.id) {
      emits("update:searchString", null);
      return emits("update:modelValue", null);
    }

    return emits("update:modelValue", _value);
  },
});

const isOpened = ref(false);

const onInput = (e) => {
  emits("update:searchString", e.target.value);
  emits("update:modelValue", null);
};

watch([selectRef], () => {
  if (selectRef.value) {
    selectRef.value.scrollTo(0, selectRef.value.children[0].clientHeight / 15);
  }
});

const inputRef = ref();

const toggle = () => {
  isOpened.value = !isOpened.value;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const wrapper = ref();

const onFocusout = (e) => {
  if (!wrapper.value.contains(e.relatedTarget)) isOpened.value = false;
};

const handleSelect = (option) => {
  if (props.closeAfterSelect) {
    isOpened.value = false;
  }
  if (!props.isHideInput) {
    emits(
      "update:searchString",
      option?.value ?? option?.name ?? option?.title
    );
  }

  model.value = option;
};

const addMore = (event) => {
  emits("scrolledBottom", event.target);
};
</script>

<style lang="scss" scoped>
.select {
  cursor: pointer;
  position: relative;

  &__field {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    width: 100%;
  }

  &__active {
    .select {
      &__icon {
        transform: rotate(180deg) translateY(50%);
      }
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    transition: 0.3s;
  }

  input {
    width: 100%;

    &::placeholder {
      line-height: 1.3;
    }
  }

  &__value {
    border-radius: 8px;
    font-size: 14px;

    padding-right: 40px;
    width: 100%;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px 10px;
    margin-top: 22px;
    width: 100%;

    &_color {
      display: flex;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 1024px) {
    &__options {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.options {
  &__item {
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;

    &:hover {
      color: var(--color-grey);
    }
    &.selected {
      color: var(--color-green);
    }
  }

  &__notfound {
    cursor: default;
  }
}

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

  &__field_placeholder-no-focus:focus + &__label_name {
    font-size: 16px;
    transform: translateY(-50%);
    top: 50%;
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
    padding: 20px 12px;

    &_placeholder_top {
      padding: 30px 12px 10px;
    }

    &:focus {
      border-color: var(--color-green);
    }
  }
}
</style>
