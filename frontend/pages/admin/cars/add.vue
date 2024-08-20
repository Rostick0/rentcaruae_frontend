<template>
  <h1 class="h1 admin">Add car</h1>
  <AdminCarForm :validateField="validateField" :onSubmit="onSubmit" />
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const { validateField, handleSubmit, setErrors } = useForm();

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

    navigateTo("/admin/cars");
  },
  () => {
    warningPopup("Not all fields are valid");
  }
);

definePageMeta({
  layout: "admin",
});
</script>
