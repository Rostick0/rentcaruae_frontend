<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div class="photoloader">
      <NuxtImg
        class="photoloader__preview"
        v-if="url"
        :src="url"
        loading="lazy"
        alt="Your img"
        width="120"
        height="120"
      />
      <label class="photoloader__block" :class="{ error: errorMessage }">
        <input
          @change="handleOnFileChange"
          v-bind="$attrs"
          class="photoloader__input"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          hidden
        />
        <UiButton class="photoloader__btn">Upload image</UiButton>
        <!-- <img class='photoloader__image' src="/img/icons/upload.svg" alt="" /> -->

        <!-- <div class="photoloader__title">Upload a file or drag and drop</div>
        <div class="photoloader__subtitle">PNG, JPG, GIF up to 3MB</div> -->
      </label>
    </div>
  </UiControl>
</template>
<script setup>
defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
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

const url = ref(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    if (typeof props.modelValue == "string") {
      url.value = props.modelValue;
    }
  }
);

const handleOnFileChange = (e) => {
  const files = e.target.files;
  if (!files?.length) {
    url.value = null;
    return emits("update:modelValue", null);
  }
  const file = files[0];
  url.value = URL.createObjectURL(file);
  emits("update:modelValue", file);
};
</script>

<style lang="scss">
.photoloader {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
 
  &__block {
    width: fit-content;
  }

  &__btn {
    pointer-events: none;
  }
}
</style>
