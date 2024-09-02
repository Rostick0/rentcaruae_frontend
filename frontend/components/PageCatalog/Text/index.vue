<template>
  <component
    v-if="componentImport"
    :is="computedAsyncComponent"
  />
</template>

<script setup>
import startCase from "lodash/startCase";

const props = defineProps({
  type: String,
});

console.log(props.type);

const componentImport = computed(async () => {
  try {
    return await import(
      `./${startCase(props?.type?.type)}/${props?.type?.value}.vue`
    );
  } catch (e) {
    return null;
  }
});

const computedAsyncComponent = computed(
  () =>
    componentImport.value && defineAsyncComponent(() => componentImport.value)
);

console.log(componentImport.value);
</script>
