<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div class="photoloader__images" @mouseup="dragElem = null">
      <template v-for="item in modelValue" :key="item.id">
        <div>
          <div @mousedown="dragElem = item">
            <UiDraggable>
              <template #willselect>
                <div
                  class="photoloader__image"
                  @mouseup="
                    dragElem &&
                      item.id != dragElem.id &&
                      changeOrder(dragElem, item)
                  "
                >
                  <div
                    class="photoloader__image_delete"
                    @click="handleRemove(item)"
                  >
                    ✖
                  </div>
                  <NuxtImg
                    class="photoloader__img"
                    :src="item?.path"
                    alt="Error"
                    loading="lazy"
                    width="154"
                    height="96"
                  />
                </div>
              </template>
              <template #selected>
                <img
                  class="photoloader__img_drag"
                  :src="item?.path"
                  alt="Error"
                  width="154"
                  height="99"
                />
              </template>
            </UiDraggable>
          </div>
        </div>
      </template>

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
              fill="white"
            />
            <path
              d="M12.5 19C15.8061 19 18.5 16.3061 18.5 13C18.5 9.69388 15.8061 7 12.5 7C9.19388 7 6.5 9.68805 6.5 13C6.5 16.312 9.19388 19 12.5 19ZM12.5 8.42857C15.019 8.42857 17.0714 10.481 17.0714 13C17.0714 15.5189 15.019 17.5714 12.5 17.5714C9.98105 17.5714 7.92857 15.5189 7.92857 13C7.92857 10.481 9.98105 8.42857 12.5 8.42857Z"
              fill="#221EE3"
            />
          </svg>
          <span class="photoloader__title">Add photo</span>
        </span>
      </label>
    </div>
  </UiControl>
</template>

<script setup>
import debounce from "lodash/debounce";
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

const dragElem = ref();

const changeOrder = debounce((dragElemArg, el) => {
  const files = [...props.modelValue];

  const first = files.findIndex((i) => i.id == dragElemArg.id);
  const second = files.findIndex((i) => i.id == el.id);

  [files[first], files[second]] = [files[second], files[first]];

  emits("update:modelValue", files);
  dragElem.value = null;
});

const handleOnFileChange = (e) => {
  const _files = e.target.files;

  if (!_files?.length) {
    // _files.value = [];
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
    background-color: var(--color-basic);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    transition: 0.3s;
    width: 154px;
    height: 96px;

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
    color: var(--color-white);
    font-size: 16px;
    letter-spacing: 0.02em;
    z-index: 2;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(auto-fit, 154px);
    grid-gap: 8px 30px;
    width: 100%;
  }

  &__image {
    padding-top: 62.34%;
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
    pointer-events: none;
    user-select: none;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &_drag {
      border-radius: 8px;
      object-fit: cover;
      z-index: 10;
    }
  }
}
</style>
