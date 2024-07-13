<template>
  <div class="options-circle" :style="style" :title="name"></div>
</template>

<script setup>
const props = defineProps({
  style: String,
  name: String,
});
</script>

<style lang="scss" scoped>
.options-circle {
  border-radius: 50%;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}
</style>
