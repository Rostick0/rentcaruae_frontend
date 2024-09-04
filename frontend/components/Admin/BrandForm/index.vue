<template>
  <AnyFormBlock title="Brand">
    <VFormComponent :field="name" />
    <VFormComponent :field="image" />
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  brand: Object,
});

const name = ref({
  type: "text",
  name: "name",
  modelValue: props.brand?.name ?? "",

  bind: {
    label: "Name",
    placeholder: "",
  },
});

const image = ref({
  type: "photo-loader",
  name: "image",
  modelValue: { path_webp: props.brand?.image_url },

  bind: {
    title: "Upload logo",
    // subtitle: "140 x 56 pix",
  },
});
</script>
