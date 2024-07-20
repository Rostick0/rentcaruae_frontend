<template>
  <div class="modal-block">
    <div v-if="close" @click="close" class="modal-block__close">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.827 15.5002L21.7258 9.60135C22.0922 9.23517 22.0922 8.64104 21.7258 8.27487C21.3593 7.90838 20.7658 7.90838 20.3993 8.27487L14.5005 14.1737L8.60135 8.27487C8.23486 7.90838 7.64135 7.90838 7.27487 8.27487C6.90838 8.64104 6.90838 9.23517 7.27487 9.60135L13.174 15.5002L7.27487 21.399C6.90838 21.7651 6.90838 22.3593 7.27487 22.7254C7.45811 22.9084 7.69826 23 7.93811 23C8.17795 23 8.4181 22.9084 8.60135 22.7251L14.5005 16.8263L20.3993 22.7251C20.5825 22.9084 20.8227 23 21.0625 23C21.3024 23 21.5425 22.9084 21.7258 22.7251C22.0922 22.359 22.0922 21.7648 21.7258 21.3987L15.827 15.5002Z"
          fill="#78787A"
        />
      </svg>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  close: Function,
});
</script>

<style lang="scss" scoped>
.modal-block {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 60px 72px;
  position: relative;
  overflow: auto;
  max-height: calc(100vh - 32px);
  max-height: calc(100dvh - 32px);

  @media (max-width: 920px) {
    padding: 32px;
  }

  &__close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
