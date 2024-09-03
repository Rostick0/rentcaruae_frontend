<template>
  <div class="car-form form__flex">
    <form class="form__fields" @submit="onSubmit">
      <SellerCarFormCarInfo :car="car" :validateField="validateField" />

      <SellerCarFormCarSpecification :car="car" :valuesForm="valuesForm" />

      <SellerCarFormCarPhoto :car="car" />

      <SellerCarFormDescription :car="car" />

      <SellerCarFormPrice :car="car" />

      <SellerCarFormLeasingOptions
        v-if="isAddedLeasingOptions"
        :car="car"
        :isShow="isAddedLeasingOptions"
        @setHide="isAddedLeasingOptions = false"
      />
      <div class="" v-else>
        <UiButton
          class="car-form__btn"
          variant="outlined"
          @click="isAddedLeasingOptions = true"
        >
          <strong>Add leasing options</strong>
        </UiButton>
      </div>

      <SellerCarFormRentalTerms :car="car" />

      <SellerCarFormSpecialOffer
        v-if="isSpecialOffer"
        :car="car"
        :valuesForm="valuesForm"
        :isShow="isSpecialOffer"
        @setHide="isSpecialOffer = false"
      />

      <div class="form__bottom">
        <div class="">
          <UiButton
            class="form-btn _special-offer"
            v-if="!isSpecialOffer"
            @click="isSpecialOffer = true"
            variant="outlined"
          >
            <span>Create Special Offer</span>
            <span class="text-small"
              >AED {{ PRICE_SPECAIL_PER_DAY }} per day</span
            >
          </UiButton>
        </div>
        <div class="form__flex_switch">
          <VFormComponent :field="is_show" />
          <UiButton>Save</UiButton>
        </div>
      </div>
    </form>
    <div class="car-form__preview form__flex_right">
      <LazyCarCardItem :car="car" />
      <LazyCarCardShortItem v-show="isSpecialOffer" :car="car" />
    </div>
  </div>
</template>

<script setup>
// const emits = defineEmits(["setValue"]);

const props = defineProps({
  car: Object,
  valuesForm: Object,
  onSubmit: {
    type: Function,
    required: true,
  },
  validateField: Function,
});

const is_show = ref({
  type: "switch",
  name: "is_show",
  modelValue: !!props?.car?.is_show,

  bind: {
    label: "Publish on website",
  },
});

const isAddedLeasingOptions = ref(!!props?.car?.price_leasing?.length);
const isSpecialOffer = ref(!!props?.car?.price_special?.length);
</script>

<style lang="scss" scoped>
.car-form {
  &__preview {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
