<template>
  <div class="car-form">
    <form class="car-form__values" @submit="onSubmit">
      <AdminCarFormCarInfo :car="car" :validateField="validateField" />

      <AdminCarFormCarSpecification :car="car" />

      <AdminCarFormCarPhoto :car="car" />

      <AdminCarFormPrice :car="car" />

      <AdminCarFormLeasingOptions
        v-if="isAddedLeasingOptions"
        :car="car"
        :isShow="isAddedLeasingOptions"
        @setHide="isAddedLeasingOptions = false"
      />
      <UiButton
        v-else
        class="car-form__btn"
        variant="outlined"
        @click="isAddedLeasingOptions = true"
        >Add leasing options</UiButton
      >

      <AdminCarFormRentalTerms :car="car" />

      <AdminCarFormSpecialOffer
        v-if="isSpecialOffer"
        :car="car"
        :isShow="isSpecialOffer"
        @setHide="isSpecialOffer = false"
      />

      <div class="car-form__values_bottom">
        <UiButton
          class="car-form__btn _special-offer"
          v-if="!isSpecialOffer"
          @click="isSpecialOffer = true"
          variant="outlined"
        >
          <span>Create Special Offer</span>
          <span class="car-form__btn_small">AED 20 per day</span>
        </UiButton>

        <VFormComponent :field="is_show" />
        <UiButton>Save</UiButton>
      </div>
    </form>
    <div class="car-form__preview">
      <LazyCarCardItem :car="car" />
      <LazyCarCardShortItem :car="car" />
    </div>
  </div>
</template>

<script setup>
import api from "~/api";
import { useForm } from "vee-validate";

const props = defineProps({
  car: {
    type: Object,
    required: false,
  },
});

const is_show = ref({
  type: "switch",
  name: "is_show",
  modelValue: false,

  bind: {
    label: "Publish on website",
  },
});

const { validateField, values, handleSubmit } = useForm();

const onSubmit = handleSubmit(async (values) => {
  console.log(JSON.stringify(values));
  // const res = await api.car.create({ data: values });
});

console.log(props.car);

const isAddedLeasingOptions = ref(!!props?.car?.price_leasing?.length);
const isSpecialOffer = ref(!!props?.car?.price_special?.length);
</script>

<style lang="scss" scoped>
.car-form {
  display: flex;
  column-gap: 80px;

  &__values {
    display: flex;
    flex-direction: column;
    row-gap: 22px;
    flex-grow: 1;

    &_bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &__btn {
    align-self: flex-start;
    font-weight: 700;

    &_small {
      font-size: 10px;
    }
  }

  &__preview {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 360px;
  }
}
</style>
