<template>
  <h1 class="h1 seller">Edit car</h1>
  <SellerCarForm
    :valuesForm="values"
    :car="data"
    :validateField="validateField"
    :onSubmit="onSubmit"
  />
</template>

<script setup>
import debounce from "lodash/debounce";
import api from "~/api";
import { useForm } from "vee-validate";

const router = useRouter();
const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "car.get",
  params: {
    extends: carFullExtends + ",cities.city",
    without_cache: true,
  },
  requestParams: {
    id,
  },
});

await get();

const { validateField, handleSubmit, setErrors, values } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    const data = await getCarOnSubmitValues(values);

    const res = await api.car.update({
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

const isRenred = ref();

onMounted(() => {
  isRenred.value = true;
});

watch(
  values,
  debounce((newV) => {
    if (!isRenred.value) return;

    data.value = updateCarShow(newV, data.value);
  }, 300)
);

definePageMeta({
  layout: "seller",
});
</script>
