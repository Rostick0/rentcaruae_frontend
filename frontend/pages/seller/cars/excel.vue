<template>
  <form class="car-excel" @submit="onSubmit">
    <AnyFormBlock title="Upload file">
      <VFormComponent :field="file" />
      <div v-for="item in errorsXlsxData">
        <strong>#{{ item?.car_id }} {{ item?.name }}</strong>
        <br />
        Errors:
        <div class="color-red text-pre-small">
          <p class="" v-for="errorItem in Object.keys(item?.errros)">
            {{ item?.errros?.[errorItem]?.[0] }}
          </p>
        </div>
      </div>
    </AnyFormBlock>
    <div class="car-excel__bottom">
      <div class="car-excel__upload">
        <UiButton>Upload</UiButton>
        <div v-if="!isFree" class="text-ui">
          {{ PRICE_UPLOAD_EXCEL_CARS }} AED
        </div>
      </div>
      <a
        class="link"
        :href="$config.public.BASE_URL + '/api/cars-excel'"
        target="_blank"
        >Download Excel file to edit
      </a>
    </div>
  </form>
</template>

<script setup>
import moment from "moment";
import { useForm } from "vee-validate";
import api from "~/api";

const { user, getUser } = await useAuth();

const isFree = computed(
  () => moment(user.value?.last_load_excel) < moment().days(-7)
);

const errorsXlsxData = ref();

const file = ref({
  type: "file-loader",
  name: "file",
  rules: "required",
  modelValue: null,

  bind: {
    title: "Excel file",
    accept: "*.xlsx",
  },
});

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async ({ file }) => {
  errorsXlsxData.value = null;

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.carsExcel.updatePrices({ data: formData });

  if (res?.error) {
    if (res?.errorResponse?.data?.errors) {
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    warningPopup("Dont valid");
    errorsXlsxData.value = res?.errorResponse?.data?.invalid;
    return;
  }

  await getUser();
  success(res?.message);
});

definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
.car-excel {
  &__bottom {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 20px;
  }

  &__upload {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
}
</style>
