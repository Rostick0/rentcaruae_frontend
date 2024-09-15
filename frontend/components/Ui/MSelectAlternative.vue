<template>
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
          :placeholder="placeholder"
          ref="inputRef"
          @input="onInput"
          :value="searchString"
          type="text"
        />
      </template>
      <template v-else>
        <input
          class="control__field control__field_placeholder-top select__value control__field_placeholder-no-focus"
          :placeholder="placeholder"
          :value="model?.value ?? model?.name ?? model?.title"
          readonly
        />
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
  <div
    class="select__options"
    v-show="alwaysOpen || isHideInput || isOpened"
    ref="selectRef"
    @mousedown.prevent
  >
    <template v-if="sortedOptions?.length">
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
  hideMessage: Boolean,
  withIcon: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Array,
    default: [],
  },
  options: Array,
  componentOption: {
    type: [Object, null],
  },
  withIcon: {
    default: true,
    type: Boolean,
  },
  isHideInput: {
    default: false,
    type: Boolean,
  },
  alwaysOpen: {
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

if (props.isHideInput) {
  emits("update:searchString", null);
}

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
  if (props.modelValue && props.modelValue?.find((i) => option.id == i.id)) {
    emits(
      "update:modelValue",
      props.modelValue?.filter((i) => i.id !== option.id)
    );
  } else {
    emits("update:modelValue", [...props.modelValue, option]);
  }
};

const sortedOptions = computed(() => {
  const options = [...(props?.options || [])];
  const modelValue = props.modelValue;

  options.sort((a, b) => {
    const firstVal = modelValue?.find?.((item) => item == a.id) ? 1 : 0;
    const secondVal = modelValue?.find?.((item) => item == b.id) ? 1 : 0;

    return secondVal - firstVal;
  });

  return options;
});

const selectedItemsText = computed(() => {
  return props.options
    .filter((i) => props.modelValue?.includes?.(i.id))
    ?.map?.((item) => item.title || item.name || item.value || item.slug)
    .join(", ");
});

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
      background-color: var(--color-blue-light);
    }
    &.selected {
      background-color: var(--color-dark);
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
  }

  &__field {
    border: 1px solid var(--color-grey-dark);
    border-radius: 8px;
    font-size: 16px;
    padding: 20px 12px;

    &:focus {
      border-color: var(--color-green);
    }
  }
}
</style>
