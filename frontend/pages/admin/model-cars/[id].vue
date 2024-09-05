<template>
  <form class="form__fields" @submit="onSubmit">
    <AdminGenerationForm :modelCar="data" />
    <div class="">
      <UiButton>Save</UiButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const router = useRouter();

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "modelCars.get",
  params: {
    extends: "brand",
    without_cache: true,
  },
  requestParams: {
    id,
  },
});
await get();

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = getModelCarOnSubmitValues(values);

    const res = await api.modelCars.update({
      data,
      id,
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
