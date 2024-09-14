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
  <UiModalToast title="Thank you for your request" :name="name">
    <p>We will contact you within 3-4 business days</p>
    <p>After approval, you will be able to publish your company</p>
  </UiModalToast>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const { user, getUser } = await useAuth();

const name = "thanksForRequest";
const { open, close } = useModal({
  name,
});

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
