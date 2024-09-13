<template>
  <div class="profile-form form__flex">
    <div class="form__fields">
      <SellerProfileFormCompany :user="user" />
      <slot name="adminBlock" />
      <SellerProfileFormCompanySchedules :user="user" />
      <div class="form__bottom">
        <div class="">
          <slot name="verification-btn" />
        </div>
        <div class="form__flex_switch">
          <VFormComponent :field="is_show" />
          <UiButton>Save</UiButton>
        </div>
      </div>
    </div>
    <div v-if="$slots.verification" class="form__flex_right">
      <slot name="verification" />
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
