<template>
  <form class="form__fields" @submit="onSubmit">
    <AdminBrandForm />
    <div class="">
      <UiButton>Save</UiButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = await getBrandOnSubmitValues(values);

    const res = await api.brands.create({
      data,
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    navigateTo("/admin/brands");
  },
  () => {
    warningPopup("Not all fields are valid");
  }
);

definePageMeta({
  layout: "admin",
});
</script>
