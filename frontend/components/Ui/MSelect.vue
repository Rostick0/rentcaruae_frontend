<template>
  <div
    @focusout="onFocusout"
    ref="wrapper"
    tabindex="-1"
    class="control__select"
  >
    <div
      class="select__field"
      :class="{ select__active: isOpened }"
      @click.stop="toggle"
    >
      <template v-if="isSearchable">
        <input
          v-if="!isOpened"
          class="select__value"
          :placeholder="placeholder || 'No selected'"
          :value="selectedItemsText"
          readonly
        />

        <input
          class="select__value"
          ref="inputRef"
          @input="$emit('update:searchString', $event.target.value)"
          :value="searchString"
          v-if="isOpened"
          type="text"
        />
      </template>
      <template v-else>
        <input
          type="text"
          class="select__value"
          :value="selectedItemsText || placeholder || 'No selected'"
        />
        <!-- <div class="select__value">
            {{ selectedItemsText || placeholder || "No selected" }}
          </div> -->
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
    <div
      v-show="isOpened"
      @scroll="handleScroll"
      class="select__options"
      @mousedown.prevent
    >
      <div
        class="options__item"
        v-for="option in sortedOptions"
        :key="option.id"
        @mousedown="handleSelect(option)"
        :class="{
          selected:
            modelValue &&
            modelValue?.find?.((i) => option?.id == i?.id || option?.id == i),
        }"
      >
        <svg
          class="options__item_icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6666 7L9.49998 16.1667L5.33331 12"
            stroke="#009639"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>
          {{ option.name || option.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits([
  "update:modelValue",
  "update:searchString",
  "scrolledBottom",
]);

const props = defineProps({
  rightIcon: String,
  errorMessage: String,
  message: String,
  label: String,
  searchString: [String, Number],
  isSearchable: Boolean,
  placeholder: String,
  withIcon: {
    type: Boolean,
    default: true,
  },
  modelValueIsNumber: {
    default: false,
    type: Boolean,
  },
  modelValue: {
    type: Array,
    default: [],
  },
  options: Array,
});

const isOpened = ref(false);

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
  if (!props.modelValueIsNumber) {
    if (props.modelValue && props.modelValue?.find((i) => option.id == i.id)) {
      emits(
        "update:modelValue",
        props.modelValue?.filter((i) => i.id !== option.id)
      );
    } else {
      emits("update:modelValue", [...props.modelValue, option]);
    }
  } else {
    if (props.modelValue && props.modelValue?.find((i) => option.id == i)) {
      emits(
        "update:modelValue",
        props.modelValue?.filter((i) => i !== option.id)
      );
    } else {
      emits("update:modelValue", [...props.modelValue, option.id]);
    }
  }
};

const sortedOptions = computed(() => {
  const options = [...(props?.options || [])];
  const modelValue = props.modelValue;
  if (!props.modelValueIsNumber) {
    options.sort((a, b) => {
      const firstVal = modelValue?.find?.((item) => item.id == a.id) ? 1 : 0;
      const secondVal = modelValue?.find?.((item) => item.id == b.id) ? 1 : 0;

      return secondVal - firstVal;
    });

    return options;
  } else {
    options.sort((a, b) => {
      const firstVal = modelValue?.find?.((item) => item == a.id) ? 1 : 0;
      const secondVal = modelValue?.find?.((item) => item == b.id) ? 1 : 0;

      return secondVal - firstVal;
    });

    return options;
  }
});

const selectedItemsText = computed(() => {
  if (props.modelValueIsNumber) {
    return props.options
      .filter((i) => props.modelValue?.includes?.(i.id))
      ?.map?.((item) => item.title || item.name || item.value || item.slug)
      .join(", ");
  }

  return props.modelValue
    ?.map((item) => item.title || item.name || item.value || item.slug)
    ?.join(", ");
});

const handleScroll = (event) => {
  const div = event.target;

  const scrollFromBottom =
    div.scrollHeight - (div.scrollTop + div.clientHeight);

  if (scrollFromBottom < 400) {
    emits("scrolledBottom");
  }
};
</script>

<style lang="scss" scoped>
.select {
  cursor: pointer;
  position: relative;

  &__field {
    position: relative;
    width: 100%;
  }

  &__active {
    .select {
      &__value {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

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
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    font-size: 16px;
    font-weight: 700;

    padding: 8px;
    padding-top: 24px;
    // padding-right: 40px;
    width: 100%;
  }

  &__options {
    background-color: var(--color-white);
    color: var(--color-basic);
    border-radius: 8px;
    box-shadow: 0 4px 4px 0 #00000040;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 8px;
    position: absolute;
    overflow: auto;
    width: 100%;
    max-height: 20rem;
    z-index: 10;
  }
}

.options {
  &__item {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    transition: 0.3s;

    &:hover {
      color: var(--color-grey);
    }
    &.selected {
      color: var(--color-green);

      .options__item_icon {
        opacity: 1;
      }
    }

    &_icon {
      transition: 0.3s;
      opacity: 0;
      flex-shrink: 0;
    }
  }

  &__notfound {
    cursor: default;
  }
}
</style>
