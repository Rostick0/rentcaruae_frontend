<template>
  <LazyUiModal :name="nameModal">
    <form class="car-promote" @submit="onSubmit">
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
});

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (data) => {
  const res = await api.car.update({
    id: props.carSelected?.id,
    data,
  });

  console.log(res);
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
