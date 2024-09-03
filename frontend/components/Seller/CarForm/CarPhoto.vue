<template>
  <AnyFormBlock title="Car photo">
    <VFormComponent :field="images" />
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue:
    props?.car?.images?.map?.((item, i) => ({ ...item?.image, order: i })) ??
    "",
});
</script>
