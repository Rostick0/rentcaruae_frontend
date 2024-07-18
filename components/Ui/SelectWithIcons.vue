<template>
  <div class="select-icons">
    <div class="select-icons__switch" @click="isOpened = !isOpened">
      <LazyNuxtImg
        class="select-icons-switch__icon"
        :src="modelValue?.icon_url"
        :alt="modelValue?.name"
        width="20"
        height="20"
      />
      <span class="select-icons__value">{{ modelValue?.name }}</span>
      <svg
        class="select-icons-switch__arrow"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.825 6.91248L10 10.7291L6.175 6.91248L5 8.08748L10 13.0875L15 8.08748L13.825 6.91248Z"
          fill="#221EE3"
        />
      </svg>
    </div>
    <div class="select-icons__options" v-show="isOpened">
      <div
        class="select-icons-option"
        v-for="item in options"
        :key="item?.id"
        @click="emits('update:modelValue', item), (isOpened = false)"
      >
        <LazyNuxtImg
          class="select-icons-option__icon"
          :src="item?.icon_url"
          :alt="item?.name"
          width="20"
          height="20"
        />
        <span class="select-icons-option__text">{{ item?.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Object, Number, String, Array],
  },
  options: Array,
});

const emits = defineEmits(["update:modelValue"]);

const isOpened = ref(false);
</script>

<style lang="scss" scoped>
.select-icons {
  position: relative;

  &__switch {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  &__value {
    color: var(--color-basic);
    font-weight: 700;
  }

  &__options {
    background-color: var(--color-white);
    color: var(--color-grey-dark);
    border: 1px solid var(--color-line);
    border-top: none;
    border-radius: 8px;
    font-size: 14px;
    padding: 4px 18px;
    position: absolute;
    // left: 50%;
    left: 0;
    bottom: -5px;
    transform: translateY(100%);
    overflow: auto;
    max-height: 20rem;
    // width: 100%;
    width: fit-content;
    z-index: 1000;
  }

  &-option {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 4px;
  }
}
</style>
