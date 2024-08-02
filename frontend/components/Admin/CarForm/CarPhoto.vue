<template>
  <AdminFormBlock title="Car photo">
    <VFormComponent :field="images" />
  </AdminFormBlock>
</template>

<script setup>
const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue: "",
});
</script>
