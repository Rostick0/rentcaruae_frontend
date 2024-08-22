<template>
  <h1 class="h1 admin">Add car</h1>
  <AdminCarForm
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

const data = ref({});

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

    navigateTo("/admin/cars");
  },
  () => {
    warningPopup("Not all fields are valid");
  }
);

watch(
  values,
  debounce((newV) => {
    const prev = data.value;

    if (newV?.model_car?.id !== prev?.model_car?.id) {
      data.value = {
        generation: {
          model_car: newV?.model_car,
        },
      };
      data.value.title = `${newV?.model_car?.brand?.name} ${newV?.model_car?.name}`;
    }

    if (newV?.transmission_id?.id !== prev?.transmission?.id) {
      data.value.transmission = newV?.transmission_id;
    }

    if (newV?.seats !== prev?.seats) {
      data.value.seats = newV?.seats;
    }

    if (newV?.security_deposit !== data.value?.security_deposit?.price) {
      data.value.security_deposit = { price: newV?.security_deposit };
    }

    if (newV?.images?.length) {
      // car?.images?.[0]?.image?.path_webp
      // data.value.images = [{ image: { path_webp: newV?.images[0]?.path } }];
    }
  }, 300)
);

definePageMeta({
  layout: "admin",
});
</script>
