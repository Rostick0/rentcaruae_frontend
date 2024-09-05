<template>
  <form class="form__fields" @submit="onSubmit">
    <AdminModelCarForm />
    <div class="">
      <UiButton>Save</UiButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const router = useRouter();

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = getModelCarOnSubmitValues(values);

    const res = await api.modelCars.create({
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

definePageMeta({
  layout: "admin",
});
</script>
