<template>
  <ClientOnly>
    <UiField
      v-if="field.type == 'text'"
      v-model="model"
      v-bind="field.bind"
      :errorMessage="errorMessage"
    />
    <UiMultiSelect
      v-else-if="field.type == 'select'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiTextarea
      v-else-if="field.type == 'textarea'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiCheckbox
      v-else-if="field.type == 'checkbox'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    >
      <slot />
    </UiCheckbox>
    <UiMultiMSelect
      v-else-if="field.type == 'multiple-select'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
      :name="field.name"
    />

    <UiDatePicker
      v-else-if="field.type == 'date'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiFileLoader
      v-else-if="field.type == 'file-loader'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />

    <UiPhotoLoader
      v-else-if="field.type == 'photo-loader'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />

    <UiMPhotoLoader
      v-else-if="field.type == 'multiple-photo-loader'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
      @setError="setErrors"
    />
    <UiRadio
      v-else-if="field.type == 'radio'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiTelSelect
      v-else-if="field.type == 'tel'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiSwitch
      v-else-if="field.type == 'switch'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiRange
      v-else-if="field.type == 'range'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
    <UiSelectCheckbox
      v-else-if="field.type == 'select-checkbox'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />

    <VFormCkeditor
      v-else-if="field.type == 'ckeditor'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />

    <VFormRecaptcha
      v-else-if="field.type == 'recaptcha'"
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
  </ClientOnly>
</template>

<script setup>
import { useField } from "vee-validate";

defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  field: Object,
  modelValue: [String, Array, Object, Number, Boolean],
});

const model = computed({
  get() {
    return props.field.modelValue;
  },
  set(value) {
    props.field.modelValue = value;
    emits("update:modelValue", value);
  },
});

const { errorMessage, value, resetField, setErrors } = useField(
  props.field.name,
  props.field.rules,
  {
    initialValue:
      props.field.convertTo?.(props.field.modelValue) ?? props.field.modelValue,
  }
);

watch(
  model,
  () => {
    value.value = props.field.convertTo?.(model.value) ?? model.value;
  },
  {
    deep: true,
  }
);

onMounted(() => {
  model.value =
    props.field.convertTo?.(props.field.modelValue) ?? props.field.modelValue;
});

onUnmounted(() => {
  if (!props.field?.withoutResetInUnmounted && model.value) model.value = "";
});
</script>
