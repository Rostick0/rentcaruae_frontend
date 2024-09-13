<template>
  <h1 class="h1 seller">Profile</h1>
  <form method="POST" @submit="onSubmit">
    <SellerProfileForm :user="user">
      <template #verification-btn>
        <UiButton class="form-btn" @click.prevent variant="outlined">
          <span>Verification request</span>
          <span class="text-small">3-4 business days</span>
        </UiButton>
      </template>
      <template #verification>
        <SellerProfileFormVerificationStatus :user="user" />
      </template>
    </SellerProfileForm>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const { user, getUser } = await useAuth();

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async (values) => {
  const data = await getProfileOnSubmitValues(values);

  const res = await api.companies.update({
    id: user.value?.company?.id,
    data,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  success("Updated");
  await getUser();
});

definePageMeta({
  layout: "seller",
});
</script>
