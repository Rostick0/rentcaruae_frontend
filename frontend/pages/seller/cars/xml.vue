<template>
  <!-- <h1 class="h1 seller">Xml upload</h1> -->
  <div class="car-xml">
    <AnyFormBlock title="Upload file">
      <VFormComponent :field="file" />
    </AnyFormBlock>
    <div class="car-xml__bottom">
      <UiButton>Upload</UiButton>
      <a
        class="link"
        :href="$config.public.BASE_URL + '/api/cars-xml'"
        target="_blank"
        >Install xml</a
      >
    </div>
  </div>
</template>

<script setup>
const file = ref({
  type: "file-loader",
  name: "file",
  rules: "required",
  modelValue: null,

  bind: {
    title: "Xml file",
    accept: "text/xml",
  },
});

definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
.car-xml {
  &__bottom {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 20px;
  }
}
</style>
