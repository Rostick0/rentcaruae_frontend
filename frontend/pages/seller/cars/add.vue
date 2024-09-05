<template>
  <h1 class="h1 seller">Add car</h1>
  <SellerCarForm
    :car="data"
    :valuesForm="values"
    :validateField="validateField"
    :onSubmit="onSubmit"
  />
</template>

<script setup>
import debounce from "lodash/debounce";
import { useForm } from "vee-validate";
import api from "~/api";

const data = ref({
  price: [{}, {}, {}],
});

const { validateField, handleSubmit, setErrors, values } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = await getCarOnSubmitValues(values);

    const res = await api.car.create({
      data,
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    router.go(-1);
  },
  () => {
    warningPopup("Not all fields are valid");
  }
);

watch(
  values,
  debounce((newV) => {
    data.value = updateCarShow(newV, data.value);
  }, 300)
);

definePageMeta({
  layout: "seller",
});
</script>
