<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <label
      class="control__fileloader fileloader__block"
      :class="{ error: errorMessage }"
    >
      <!-- accept="image/png,image/jpeg,image/jpg,*/pdf,*/doc" -->
      <input
        @change="handleOnFileChange"
        @click="$event.target.value = null"
        v-bind="$attrs"
        class="fileloader__input"
        type="file"
      />
      <template v-if="modelValue"
        >Filename:<br />
        {{ modelValue?.name }}</template
      >
      <span class="fileloader__block_content" v-else>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 7.96082V18.5502C0.5 20.1665 1.81265 21.4792 3.42898 21.4792H21.571C23.1873 21.4792 24.5 20.1665 24.5 18.5502V7.96082C24.5 6.42286 23.251 5.17388 21.7131 5.17388H17.8143L17.7212 4.76735C17.3441 3.13633 15.909 2 14.2339 2H10.7612C9.09102 2 7.65592 3.13633 7.27388 4.76735L7.18082 5.17388H3.28694C1.74898 5.17388 0.5 6.42775 0.5 7.96082Z"
            fill="white"
          />
          <path
            d="M12.5 19C15.8061 19 18.5 16.3061 18.5 13C18.5 9.69388 15.8061 7 12.5 7C9.19388 7 6.5 9.68805 6.5 13C6.5 16.312 9.19388 19 12.5 19ZM12.5 8.42857C15.019 8.42857 17.0714 10.481 17.0714 13C17.0714 15.5189 15.019 17.5714 12.5 17.5714C9.98105 17.5714 7.92857 15.5189 7.92857 13C7.92857 10.481 9.98105 8.42857 12.5 8.42857Z"
            fill="#221EE3"
          />
        </svg>
        <span class="fileloader__title">{{ title ?? "Upload file" }}</span>
        <span class="fileloader__subtitle" v-if="subtitle">{{ subtitle }}</span>
      </span>
    </label>
    <a
      class="link"
      v-if="modelValue?.path"
      :href="modelValue?.path"
      target="_blank"
      >link</a
    >
  </UiControl>
</template>
<script setup>
defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: [String, Object],
  invalid: Boolean,
  rightIcon: String,
  message: String,
  label: String,
  placeholder: String,
  maska: String,
  dataMaskaReversed: Boolean,
  maskaTokens: String,
  errorMessage: String,
  onChange: Function,
  title: String,
  subtitle: String,
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
});

const handleOnFileChange = (e) => {
  const files = e.target.files;
  if (!files?.length) {
    return emits("update:modelValue", null);
  }
  const file = files[0];

  emits("update:modelValue", file);
};
</script>

<style lang="scss" scoped>
.fileloader {
  &__block {
    background-color: var(--color-basic);
    color: var(--color-white);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
    padding: 6px;
    position: relative;
    transition: 0.3s;
    word-break: break-all;
    overflow-wrap: anywhere;
    width: 154px;
    height: 96px;

    &_content {
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 4px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__block.error {
    // transition: 0.3s;
  }

  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__input {
    display: none;
  }

  &__title {
    z-index: 2;
  }

  &__subtitle {
    font-size: 10px;
    font-weight: 700;
    z-index: 2;
  }
}
</style>
