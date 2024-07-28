<template>
  <div class="stat-type">
    <span class="stat-type__text">
      <slot />
    </span>
    <svg
      v-if="isShowType"
      class="stat-type__icon"
      :class="{
        decline: isDecline,
      }"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 14V4.55333L11.56 6.94L12.5 6L8.5 2L4.5 6L5.44 6.94L7.83333 4.55333V14H9.16667Z"
        fill="#007A4F"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  isShowType: Boolean,
  isDecline: {
    type: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.stat-type {
  display: flex;
  align-items: center;
  column-gap: 10px;

  &__icon {
    flex-shrink: 0;

    &.decline {
      transform: rotate(180deg);

      path {
        fill: #d50a0a;
      }
    }
  }
}
</style>
