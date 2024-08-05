<template>
  <LazyUiModal :name="nameModal">
    <form action="">
      <LazyAdminCarFormSpecialOffer
        :car="carSelected"
        isShow
        @setHide="close"
      />
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
    type: Object,
    required: true,
  },
});

const { open, close } = useModal({
  name: props.nameModal,
});
</script>
