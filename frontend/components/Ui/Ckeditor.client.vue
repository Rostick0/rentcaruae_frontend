<template>
  <ckedit
    :editor="ClassicEditor"
    :config="editorConfig"
    v-model="value"
    @ready="onInit"
  />
</template>

<script lang="ts" setup>
const ckedit = await import("@ckeditor/ckeditor5-vue").then(
  (res) => res.default.component
);
const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic").then(
  (res) => res.default
);

import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import api from "~/api";

const props = defineProps<{
  modelValue?: any;
}>();
const emit = defineEmits(["update:modelValue"]);

class UploadAdapter {
  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then((file: any) => {
      const data = new FormData();
      data.append("image", file);
      const genericError = `Couldn't upload file: ${file.name}.`;

      return api.image
        .create({
          data,
        })
        .then((res) => {
          console.log(res);
          return { default: res?.data.path_webp };
        })
        .catch(({ error }) => Promise.reject(error?.message ?? genericError));
    });
  }

  abort() {
    return Promise.reject();
  }
}

const onInit = (editor: any) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
    new UploadAdapter(loader);

  // editor.colorButton_colors = "CF5D4E,454545,FFF,DDD,CCEAEE,66AB16";
  // editor.colorButton_enableAutomatic = false;
  // console.log(editor.config());
  // editor.toolbar.push(["TextColor", "BGColor"]);
};

const editorConfig = ref<EditorConfig>({
  // toolbar: [
  //   "undo",
  //   "redo",
  //   "|",
  //   "heading",
  //   "|",
  //   "fontFamily",
  //   "FontSize",
  //   "fontColor",
  //   "fontBackgroundColor",
  //   "|",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "subscript",
  //   "superscript",
  //   "|",
  //   "link",
  //   "alignment",
  //   "outdent",
  //   "indent",
  //   "|",
  //   "bulletedList",
  //   "numberedList",
  //   "blockQuote",
  // ],
});

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
