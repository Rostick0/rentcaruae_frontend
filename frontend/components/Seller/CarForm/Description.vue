<template>
  <AnyFormBlock class="description" title="Car information">
    <VFormComponent :field="description" />
    <div class="text-ui color-red description__info text-pre-small">
      *it is forbidden to specify phone numbers, e-mail addresses and other
      opportunities for direct communication
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const description = ref({
  type: "textarea",
  name: "description",
  rules: "max:4000",
  modelValue: props?.car?.description ?? "",

  bind: {
    label: `Car description ${props?.car?.description?.length ?? 0}/4000`,
    placeholder: "Description",
    rows: 10,
  },
});

watch(
  () => description.value.modelValue?.length,
  (newV) => {
    description.value.bind.label = `Car description ${newV ?? 0}/4000`;
  }
);
</script>

<style lang="scss" scoped>
.description {
}
</style>
