<template>
  <LazyUiModalToast class="modal-delete" :title="title" :="$props">
    Are you sure you want to delete it?
    <template #bottom>
      <div class="modal-delete__btns">
        <UiButton @click="confirm" variant="red">Delete</UiButton>
        <UiButton @click="close" variant="outlined">Cancel</UiButton>
      </div>
    </template>
  </LazyUiModalToast>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Confirm delete",
  },
  name: {
    type: String,
    default: "delete-modal",
  },
  style: [String, Object, Array, String],
  position: { type: String, default: "center" },
  customClass: { type: String, default: null },
  isOpenAlways: Boolean,
  cancelCloseOuter: Boolean,
  functionConfirm: Function,
});

const { close } = useModal({
  name: props.name,
});

const confirm = () => {
  props?.functionConfirm?.();
  close();
};
</script>

<style lang="scss">
.modal-delete {
  &__btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 240px;
  }
}
</style>
