<template>
  <h1 class="h1 seller">Profile</h1>
  <form method="POST" @submit="onSubmit">
    <SellerProfileForm :user="data">
      <template #adminBlock>
        <AdminProfileFormSpecial :user="data">
          <template #balance>
            <VFormComponent :field="balance" />
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

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "users.get",
  params: {
    extends:
      "company.company_schedules,company.city,company.license.file,company.sertificate.file,company.image.image",
  },
  requestParams: {
    id,
  },
});
await get();

const balance = ref({
  type: "text",
  name: "user.balance",
  modelValue: data.value?.balance ?? "",

  bind: {
    label: "Balance user",
    placeholder: "Balance",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const companyId = computed(() => data.value?.company?.id);

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async (values) => {
  const data = await getProfileOnSubmitValues(values);

  const res = await api.companies.update({
    id: companyId.value,
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
