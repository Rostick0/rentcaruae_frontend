<template>
  <UiControl
    class="select-checkbox"
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
  >
    <div class="select-checkbox__inner">
      <div
        class="select-checkbox__"
        v-for="itemGroup in optionsGroup"
        :key="itemGroup?.id"
      >
        <div class="select-checkbox__title">{{ itemGroup?.group }}</div>
        <div class="select-checkbox__list">
          <UiCheckbox
            class="select-checkbox__item"
            v-for="option in itemGroup?.value"
            @click="handleSelect(option)"
            :modelValue="
              !!modelValue?.find?.(
                (i) => option?.id == i?.id || option?.id == i
              )
            "
            >{{ option?.name }}</UiCheckbox
          >
        </div>
      </div>
    </div>
  </UiControl>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  errorMessage: String,
  message: String,
  invalid: String,
  label: String,
  placeholder: String,
  modelValue: {
    type: Array,
    default: [],
  },
  options: Array,
});

const optionsGroup = computed(() => groupByInArray(props?.options, "type"));

const handleSelect = (option) => {
  if (props.modelValue && props.modelValue?.find((i) => option.id == i)) {
    emits(
      "update:modelValue",
      props.modelValue?.filter((i) => i !== option.id)
    );
  } else {
    emits("update:modelValue", [...props.modelValue, option.id]);
  }
};

// const handleScroll = (event) => {
//   const div = event.target;

//   const scrollFromBottom =
//     div.scrollHeight - (div.scrollTop + div.clientHeight);

//   if (scrollFromBottom < 400) {
//     emits("scrolledBottom");
//   }
// };
</script>

<style lang="scss" scoped>
.select-checkbox {
  &__inner {
    color: #464655;
    display: flex;
    font-size: 14px;
    grid-gap: 20px 40px;
  }

  &__title {
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 8px;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &__item {
    font-size: 14px;
  }
}
</style>

<style lang="scss">
.select-checkbox {
  &.control {
    row-gap: 10px;
  }

  .control {
    .control__label {
      background-color: transparent;
      font-size: 16px;
      font-weight: 500;
      position: static;
    }
  }
}
</style>
