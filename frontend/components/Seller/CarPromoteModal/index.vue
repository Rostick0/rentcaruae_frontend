<template>
  <LazyUiModal :name="nameModal">
    <form class="car-promote" @submit="onSubmit">
      <LazySellerCarFormSpecialOffer :car="carSelected" isShow @setHide="close">
        <template #bottom>
          <div class="car-promote__bottom">
            <UiButton>Save</UiButton>
          </div>
        </template>
      </LazySellerCarFormSpecialOffer>
    </form>
  </LazyUiModal>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const props = defineProps({
  nameModal: {
    type: String,
    required: true,
  },
  carSelected: {
    type: [Object, null],
    required: true,
  },
  getCars: Function,
});

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async ({ price_special }) => {
  const res = await api.car.update({
    id: props.carSelected?.id,
    data: {
      price_special: price_special?.map((item) => removeSpaces(item)),
    },
  });

  if (res?.error) {
    warningPopup(res?.errorResponse);
    return;
  }

  close();
  props?.getCars?.();
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
