<template>
  <h1 class="h1 seller">Profile</h1>
  <form method="POST" @submit="onSubmit">
    <SellerProfileForm :user="user">
      <template #verification-btn>
        <UiButton
          class="form-btn"
          v-if="isShowVerificationAction"
          @click.prevent="createVerification"
          variant="outlined"
        >
          <span>Verification request</span>
          <span class="text-small">3-4 business days</span>
        </UiButton>
      </template>
      <template #verification>
        <SellerProfileFormVerificationStatus
          :user="user"
          :isShowBtn="isShowVerificationAction"
          :clickBtn="createVerification"
        />
      </template>
    </SellerProfileForm>
  </form>
  <UiModalToast title="Thank you for your request" :name="name">
    <template></template>
    <p>We will contact you within 3-4 business days</p>
    <p>After approval, you will be able to publish your company</p>
  </UiModalToast>
  <UiModalToast title="Error" :name="nameError">
    <div class="color-red">{{ modalErrorMessage }}</div>
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

const modalErrorMessage = ref();

const nameError = "errorModal";
const { open: openError, close: closeError } = useModal({
  name: nameError,
});

const isShowVerificationAction = ref(
  !user.value?.is_verified &&
    user.value?.company?.license &&
    user.value?.company?.sertificate
);

const createVerification = async () => {
  const res = await api.verificationUsers.create({});
  if (res?.error) {
    modalErrorMessage.value = res?.errorResponse?.data?.message;
    openError();
    return;
  }
  isShowVerificationAction.value = false;
  open();
};

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
