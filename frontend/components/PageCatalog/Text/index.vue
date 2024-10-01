<template>
  <component v-if="initCompnent" :is="textComponent" />
</template>

<script setup>
import startCase from "lodash/startCase";

const props = defineProps({
  type: Object,
  isLeasing: Boolean,
});

const componentImport = async () => {
  try {
    if (props.isLeasing) {
      return await import("./Leasing/index.vue");
    }
    return await import(
      `./${startCase(props?.type?.type)}/${props?.type?.value}.vue`
    );
  } catch (e) {
    return null;
  }
};

const initCompnent = await componentImport();
const textComponent = ref();

if (initCompnent) {
  textComponent.value = defineAsyncComponent(async () => await initCompnent);
}
</script>
