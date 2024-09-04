<template>
  <form class="form__fields" @submit="onSubmit">
    <AdminDepositeForm />
    <div class="">
      <UiButton>Save</UiButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const { handleSubmit, setErrors, values } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = await getBrandOnSubmitValues(values);

    const res = await api.deposites.create({
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
