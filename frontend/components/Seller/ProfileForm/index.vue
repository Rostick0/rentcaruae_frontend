<template>
  <div class="profile-form form__flex">
    <div class="form__fields">
      <SellerProfileFormCompany :user="user" />
      <SellerProfileFormCompanySchedules :user="user" />
      <div class="form__bottom">
        <UiButton class="form-btn" @click.prevent variant="outlined">
          <span>Verification request</span>
          <span class="text-small">3-4 business days</span>
        </UiButton>
        <div class="form__flex_switch">
          <VFormComponent :field="is_show" />
          <UiButton>Save</UiButton>
        </div>
      </div>
    </div>
    <div class="form__flex_right">
      <SellerProfileFormVerificationStatus />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const is_show = ref({
  type: "switch",
  name: "is_show",
  modelValue: !!props.user?.is_show,

  bind: {
    label: "Publish on website",
  },
});
</script>
