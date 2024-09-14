<template>
  <!-- {{ $props }} -->
  <UiModal :="$props">
    <div class="modal-toast">
      <div class="modal-toast__top">
        <div class="modal-toast__title">{{ title }}</div>
        <button class="d-flex" @click="close">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.827 10.5002L16.7258 4.60135C17.0922 4.23517 17.0922 3.64104 16.7258 3.27487C16.3593 2.90838 15.7658 2.90838 15.3993 3.27487L9.50047 9.17367L3.60135 3.27487C3.23486 2.90838 2.64135 2.90838 2.27487 3.27487C1.90838 3.64104 1.90838 4.23517 2.27487 4.60135L8.17399 10.5002L2.27487 16.399C1.90838 16.7651 1.90838 17.3593 2.27487 17.7254C2.45811 17.9084 2.69826 18 2.93811 18C3.17795 18 3.4181 17.9084 3.60135 17.7251L9.50047 11.8263L15.3993 17.7251C15.5825 17.9084 15.8227 18 16.0625 18C16.3024 18 16.5425 17.9084 16.7258 17.7251C17.0922 17.359 17.0922 16.7648 16.7258 16.3987L10.827 10.5002Z"
              fill="#1D1B20"
            />
          </svg>
        </button>
      </div>
      <div class="modal-toast__content">
        <div class="modal-toast__content_inner">
          <slot />
        </div>
        <div class="modal-toast__bottom">
          <UiButton class="modal-toast__btn" @click="close">{{
            btnName
          }}</UiButton>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
const props = defineProps({
  title: String,
  name: String,
  style: [String, Object, Array, String],
  position: { type: String, default: "center" },
  customClass: { type: String, default: null },
  isOpenAlways: Boolean,
  cancelCloseOuter: Boolean,
  btnName: {
    type: String,
    default: "Ok",
  },
});

const { close } = useModal({
  name: props.name,
});
</script>

<style lang="scss" scoped>
.modal-toast {
  background-color: var(--color-white);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-height: 223px;
  width: 100%;
  max-width: 750px;

  &__top {
    border-bottom: 1px solid var(--color-line);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: 12px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;

    &_inner {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      row-gap: 10px;
    }
  }

  &__bottom {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
