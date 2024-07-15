<template>
  <UiControl
    class="control-select"
    :label="label"
    :hideMessage="hideMessage"
    :invalid="!!errorMessage"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div @focusout="onFocusout" ref="wrapper" tabindex="-1" class="select">
      <div
        @keydown.enter="isOpened = !isOpened"
        class="select__field"
        tabindex="0"
        :class="{
          select__active: isOpened,
        }"
        @click="toggle"
      >
        <template v-if="withLeftIcon">
          <component v-if="componentLeftIcon" :is="componentLeftIcon" />
          <span
            class="select__icon _left"
            v-else-if="svgLeftIcon"
            v-html="svgLeftIcon"
          ></span>
        </template>
        <template v-if="isSearchable">
          <input
            class="select__value"
            :class="{ icon: withIcon, 'icon-left': withLeftIcon }"
            :placeholder="placeholder"
            :value="model?.value ?? model?.name ?? model?.title"
            v-if="!isOpened"
          />
          <input
            class="select__value"
            :class="{ icon: withIcon, 'icon-left': withLeftIcon }"
            v-if="isOpened"
            :placeholder="placeholder"
            ref="inputRef"
            @input="$emit('update:searchString', $event.target.value)"
            :value="searchString"
            type="text"
          />
        </template>
        <template v-else>
          <div
            class="select__value"
            :class="{
              placeholder:
                placeholder && !(model?.value ?? model?.name ?? model?.title),
              icon: withIcon,
              'icon-left': withLeftIcon,
            }"
          >
            {{
              (model?.value ?? model?.name ?? model?.title ?? placeholder) ||
              "No selected"
            }}
          </div>
          <!-- <input
            type="text"
            class="select__value"
            :value="
              (model?.value ?? model?.name ?? model?.title ?? placeholder) ||
              'No selected'
            "
            readonly
          /> -->
        </template>
        <template v-if="withIcon">
          <component v-if="componentIcon" :is="componentIcon" />
          <span
            class="select__icon"
            v-else-if="svgIcon"
            v-html="svgIcon"
          ></span>
          <svg
            v-else
            class="select__icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.825 6.91248L10 10.7291L6.175 6.91248L5 8.08748L10 13.0875L15 8.08748L13.825 6.91248Z"
              fill="var(--color-basic)"
            />
          </svg>
        </template>
      </div>
      <div
        class="select__options"
        v-show="isOpened"
        ref="selectRef"
        @scroll="handleScroll"
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
            <span>{{ option?.value ?? option?.name ?? option?.title }}</span>
          </div>
        </template>
        <template v-else>
          <div class="options__notfound">No results</div>
        </template>
      </div>
    </div>
  </UiControl>
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
  closeAfterSelect: Boolean,
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
  withIcon: {
    default: true,
    type: Boolean,
  },
  svgIcon: {
    default: null,
    type: [String, null, undefined],
  },
  componentIcon: {
    default: null,
    type: [Object, null, undefined],
  },
  withLeftIcon: {
    default: false,
    type: Boolean,
  },
  svgLeftIcon: {
    default: null,
    type: [String, null, undefined],
  },
  componentLeftIcon: {
    default: null,
    type: [Object, null, undefined],
  },
});
const emits = defineEmits(["scrolledTop", "scrolledBottom"]);

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
        return emits("update:modelValue", null);
      }

      return emits("update:modelValue", _value.id);
    }

    if (props.modelValue?.id === _value?.id) {
      return emits("update:modelValue", null);
    }

    return emits("update:modelValue", _value);
  },
});

const isOpened = ref(false);

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
  emits("update:searchString", option?.value ?? option?.name ?? option?.title);
  model.value = option;
};

const handleScroll = (event) => {
  const div = event.target;

  const scrollFromTop = div.scrollTop;
  const scrollFromBottom =
    div.scrollHeight - (div.scrollTop + div.clientHeight);

  if (scrollFromBottom < 20) {
    emits("scrolledBottom", div);
  }
  if (scrollFromTop < 20) {
    emits("scrolledTop", div);
  }
};
</script>

<style lang="scss" scoped>
.control-select {
  width: fit-content;
}

.select {
  cursor: pointer;
  position: relative;

  &__field {
    position: relative;
    // width: 100%;
  }

  &__icon {
    display: flex;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    transition: 0.3s;

    &._left {
      left: 16px;
      right: initial;
    }
  }

  input {
    width: 100%;

    &::placeholder {
      line-height: 1.3;
    }
  }

  &__value {
    color: var(--color-basic);
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
    white-space: nowrap;
    padding: 12px 16px;
    // width: 100%;
    width: fit-content;

    &.icon {
      padding-right: 40px;
    }

    &.icon-left {
      padding-left: 40px;
    }
  }

  .options {
    background-color: var(--color-white);
    color: var(--color-grey-dark);
    border: 1px solid var(--color-line);
    border-top: none;
    border-radius: 8px;
    font-size: 14px;
    padding: 4px 18px;

    &__item {
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
    // left: 50%;
    bottom: 1px;
    transform: translateY(100%);
    overflow: auto;
    max-height: 20rem;
    width: 100%;
    // width: fit-content;
    z-index: 1000;
  }
}
</style>
