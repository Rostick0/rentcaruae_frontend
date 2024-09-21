<template>
  <!-- <h1 class="h1 seller">Excel upload</h1> -->
  <div class="car-excel">
    <AnyFormBlock title="Upload file">
      <VFormComponent :field="file" />
    </AnyFormBlock>
    <div class="car-excel__bottom">
      <UiButton>Upload</UiButton>
      <a
        class="link"
        :href="$config.public.BASE_URL + '/api/cars-excel'"
        target="_blank"
        >Install excel</a
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
    title: "Excel file",
    accept: "application/vnd.ms-excel",
  },
});

definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
.car-excel {
  &__bottom {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 20px;
  }
}
</style>
