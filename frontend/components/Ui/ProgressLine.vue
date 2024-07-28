<template>
  <div class="progress-line">
    <div class="progress-line__value" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: Number,
  },
});
</script>

<style lang="scss" scoped>
.progress-line {
  background-color: #26bce433;
  border-radius: 16px;
  overflow: hidden;
  width: 192px;
  height: 16px;

  &__value {
    background-color: var(--color-basic);
    height: 100%;
  }
}
</style>
