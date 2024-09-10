<template>
  <ckedit :editor="ClassicEditor" :config="editorConfig" v-model="value" />
</template>

<script lang="ts" setup>
const CKEditor = await import("@ckeditor/ckeditor5-vue");
// import CKEditor from "@ckeditor/ckeditor5-vue";
// const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic");
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic").then(
  (res) => res.default
);
import type { EditorConfig } from "@ckeditor/ckeditor5-core";

const ckedit = CKEditor.default.component;

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
</script>
