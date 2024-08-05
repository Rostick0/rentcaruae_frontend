<template>
  <h1 class="h1 admin">Edit car</h1>
  <AdminCarForm
    :car="data"
    :validateField="validateField"
    :onSubmit="onSubmit"
  />
</template>

<script setup>
import api from "~/api";
import useImage from "~/composables/useImage";
import { useForm } from "vee-validate";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "car.get",
  params: {
    extends: carFullExtends,
  },
  requestParams: {
    id,
  },
});

await get();

const { validateField, handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async (values) => {
  const data = await getCarOnSubmitValues(values);

  console.log(data);
  const res = await api.car.update({
    data,
    id,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  navigateTo("/admin/cars");
});

definePageMeta({
  layout: "admin",
});
</script>
