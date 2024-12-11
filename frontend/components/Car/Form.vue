<template>
  <div class="calc-item" ref="book">
    <div class="calc__title">{{ $t("bookingDetails.bookingDetails") }}</div>
    <VFormComponent :field="tel" />
    <VFormComponent :field="full_name" />
    <VFormComponent :field="email" />
    <CalcAmount
      :price="priceRental"
      :textTopleft="`Rental ${periodRental} ${periodText}`"
      :tax="tax"
    >
      <template #calc-stats>
        <slot name="calc-stats" />
      </template>
      <template #summary>
        <slot name="summary" />
      </template>
    </CalcAmount>
    <UiButton class="calc__button">{{ $t("calc.Book") }}</UiButton>
    <VFormComponent :field="is_agree" class="calc-item__checkbox">
      {{ $t("bookForm.TickingBoxAgree") }}
      <NuxtLink :to="$localePath(/terms_of_service/)" target="_blank">{{
        $t("termsService")
      }}</NuxtLink>
      <br />{{ $t("bookForm.and") }}
      <NuxtLink :to="$localePath(/privacy_policy/)" target="_blank">{{
        $t("privacyPolicy")
      }}</NuxtLink
      >,
      {{ $t("bookForm.includingCookie") }}
    </VFormComponent>
  </div>
</template>

<script setup>
const props = defineProps({
  periodRental: [String, Number],
  priceRental: [String, Number],
  tax: [String, Number],
  periodText: String,
});

const { t } = useI18n();

const tel = ref({
  type: "tel",
  name: "tel",
  modelValue: "",
  rules: "",

  bind: {
    label: t("bookForm.tel.label"),
  },
});

const full_name = ref({
  type: "text",
  name: "full_name",
  modelValue: "",
  rules: "required|max:255",

  bind: {
    label: t("bookForm.full_name.label"),
  },
});

const email = ref({
  type: "text",
  name: "email",
  modelValue: "",
  rules: "required|email|max:255",

  bind: {
    label: t("bookForm.email.label"),
  },
});

const is_agree = ref({
  type: "checkbox",
  name: "is_agree",
  modelValue: true,
  rules: "required",

  bind: {
    variant: "grey-small",
  },
});
</script>

<style lang="scss" scoped>
@forward "../../assets/scss/components/car-carc";
</style>
