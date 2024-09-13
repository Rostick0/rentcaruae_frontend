<template>
  <h1 class="h1 seller">Profile</h1>
  <form method="POST" @submit="onSubmit">
    <SellerProfileForm>
      <template #adminBlock>
        <AdminProfileFormSpecial>
          <template #balance>
            <VFormComponent :field="deposite_id" />
          </template>
        </AdminProfileFormSpecial>
      </template>
    </SellerProfileForm>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const router = useRouter();

const deposites = await api.deposites.getAll({});
const deposite_id = ref({
  type: "select",
  name: "deposite_id",
  modelValue: "",

  bind: {
    label: "Deposite user",
    options: deposites?.data?.map?.((item) => ({ ...item, name: item?.price })),
  },
});

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async (values) => {
  const data = await getProfileOnSubmitValues(values);

  const res = await api.companies.create({
    data,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  success("Updated");
  router.go(-1);
});

definePageMeta({
  layout: "admin",
});
</script>
