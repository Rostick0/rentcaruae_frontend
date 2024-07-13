<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <UiStack flex="same-all" gap="2" flexDirection="column">
      <div class="photoloader__images">
        <div class="photoloader__image" v-for="item in files" :key="item.id">
          <div class="photoloader__image_delete" @click="handleRemove(item)">
            ✖
          </div>
          <img
            class="photoloader__img"
            :src="item?.path"
            alt="Ошибка загрузки"
          />
        </div>
        <label
          class="control__photoloader photoloader__block"
          :class="{ error: errorMessage }"
        >
          <input
            @change="handleOnFileChange"
            @click="$event.target.value = null"
            v-bind="$attrs"
            class="photoloader__input"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
          />
          <span class="photoloader__block_content">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 7.96082V18.5502C0.5 20.1665 1.81265 21.4792 3.42898 21.4792H21.571C23.1873 21.4792 24.5 20.1665 24.5 18.5502V7.96082C24.5 6.42286 23.251 5.17388 21.7131 5.17388H17.8143L17.7212 4.76735C17.3441 3.13633 15.909 2 14.2339 2H10.7612C9.09102 2 7.65592 3.13633 7.27388 4.76735L7.18082 5.17388H3.28694C1.74898 5.17388 0.5 6.42775 0.5 7.96082Z"
                fill="#009639"
              />
              <path
                d="M12.5 19C15.8061 19 18.5 16.3061 18.5 13C18.5 9.69388 15.8061 7 12.5 7C9.19388 7 6.5 9.68805 6.5 13C6.5 16.312 9.19388 19 12.5 19ZM12.5 8.42857C15.019 8.42857 17.0714 10.481 17.0714 13C17.0714 15.5189 15.019 17.5714 12.5 17.5714C9.98105 17.5714 7.92857 15.5189 7.92857 13C7.92857 10.481 9.98105 8.42857 12.5 8.42857Z"
                fill="white"
              />
            </svg>
            <span class="photoloader__title">Add photo</span>
          </span>
        </label>
      </div>
    </UiStack>
  </UiControl>
</template>
<script setup>
import { size } from "@vee-validate/rules";
import { v4 } from "uuid";

defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue", "remove", "setError"]);

const props = defineProps({
  modelValue: [String, Object, Array],
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
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
});

const files = ref(props.modelValue);

onMounted(async () => {
  files.value = props?.modelValue || [];
});

const handleOnFileChange = (e) => {
  const _files = e.target.files;

  if (!_files?.length) {
    _files.value = [];
    return emits("update:modelValue", []);
  }

  const sizeFile = 16384;

  if (
    !size(_files[0], {
      size: sizeFile,
    })
  )
    return emits("setError", `The image size must be less than ${sizeFile} KB`);

  if (!["image/png", "image/jpeg", "image/jpg"].includes(_files[0].type))
    return emits("setError", "The file must be an image");

  const file = {
    id: v4(),
    path: URL.createObjectURL(_files[0]),
    file: _files[0],
  };

  emits("update:modelValue", [...(props?.modelValue || []), file]);
};

watch(
  () => props.modelValue,
  () => {
    files.value = props.modelValue;
  }
);

const handleRemove = (item) => {
  emits(
    "update:modelValue",
    props.modelValue.filter((i) => i.id !== item.id)
  );
};
</script>

<style lang="scss" scoped>
.photoloader {
  &__block {
    background: #00963940;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 100%;
    position: relative;
    transition: 0.3s;
    width: 100%;

    &_content {
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 6px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__block.error {
    transition: 0.3s;
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
    color: var(--color-green);
    font-size: 16px;
    z-index: 2;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
    width: 100%;
  }

  &__image {
    padding-top: 100%;
    position: relative;

    &_delete {
      background-color: rgb(var(--color-white));
      color: rgb(var(--color-red));
      border-radius: 0.33rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      transition: 0.3s;
      width: 1.25rem;
      height: 1.25rem;
      z-index: 1;

      &:hover {
        background-color: rgb(var(--color-pre-white));
      }
    }
  }

  &__img {
    border-radius: 8px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 576px) {
    &__images {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 370px) {
    &__images {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
