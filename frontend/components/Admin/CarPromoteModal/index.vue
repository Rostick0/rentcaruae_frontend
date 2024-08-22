<template>
  <LazyUiModal :name="nameModal">
    <form class="car-promote">
      <LazyAdminCarFormSpecialOffer :car="carSelected" isShow @setHide="close">
        <template #bottom>
          <div class="car-promote__bottom">
            <UiButton>Save</UiButton>
          </div>
        </template>
      </LazyAdminCarFormSpecialOffer>
    </form>
  </LazyUiModal>
</template>

<script setup>
const props = defineProps({
  nameModal: {
    type: String,
    required: true,
  },
  carSelected: {
    type: [Object, null],
    required: true,
  },
});

const { open, close } = useModal({
  name: props.nameModal,
});
</script>

<style lang="scss" scoped>
.car-promote {
  width: 100%;
  max-width: 750px;

  &__bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
