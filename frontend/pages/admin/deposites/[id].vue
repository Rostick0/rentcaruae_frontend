<template>
  <form class="form__fields" @submit="onSubmit">
    <AdminDepositeForm :deposite="data" />
    <div class="">
      <UiButton>Save</UiButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "deposites.get",
  params: {
    extends: "deposite_leads",
  },
  requestParams: {
    id,
  },
});
await get();

const { handleSubmit, setErrors, values } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = getDepositeOnSubmitValues(values);

    const res = await api.deposites.update({
      data,
      id,
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    navigateTo("/admin/deposites/");
  },
  () => {
    warningPopup("Not all fields are valid");
  }
);

definePageMeta({
  layout: "admin",
});
</script>
