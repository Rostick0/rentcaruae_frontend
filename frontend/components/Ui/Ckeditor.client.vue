<template>
  1
</template>
<!-- <template>
  <ckeditor
    :editor="ClassicEditor"
    :config="editorConfig"
    v-model="value"
  ></ckeditor>
</template>

<script lang="ts" setup>
// import "@ckeditor/ckeditor5-build-classic/build/translations/ru";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";

const props = defineProps<{
  modelValue?: any;
}>();
const emit = defineEmits(["update:modelValue"]);

const editorConfig = ref<EditorConfig>({
  // ckfinder: {
  //     uploadUrl: '/api/file/upload'
  // }
});

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script> -->
