<template>
  <AnyFormBlock title="User info">
    <div class="form-item">
      <VFormComponent :field="user_full_name" />
      <VFormComponent :field="user_tel" />
    </div>
    <div class="form-item">
      <VFormComponent :field="user_email" />
      <div>
        <VFormComponent :field="telegram_ids" />
        <a class="link" href="https://t.me/getmyid_bot" target="_blank"
          >Get your id</a
        >
        &nbsp;
        <a class="link" href="https://t.me/rentcaruae_bot" target="_blank"
          >Access messages in tg</a
        >
      </div>
    </div>
    <div class="form-item">
      <VFormComponent :field="user_is_mail_alerts" />
      <VFormComponent :field="user_is_tg_alerts" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const user_full_name = ref({
  type: "text",
  name: "user.full_name",
  rules: "required|max:255",
  modelValue: props.user?.full_name ?? "",

  bind: {
    label: "User Name",
    placeholder: "User name",
  },
});

const user_tel = ref({
  type: "tel",
  name: "user.tel",
  modelValue: convertPhoneToForm(props.user?.tel),

  bind: {
    label: "User number",
  },
});

const user_email = ref({
  type: "text",
  name: "user.email",
  rules: "required|email|max:255",
  modelValue: props.user?.email ?? "",

  bind: {
    label: "User email",
    placeholder: "email@company_name.com",
  },
});

const user_is_mail_alerts = ref({
  type: "switch",
  name: "user.is_mail_alerts",
  modelValue: props.user?.is_mail_alerts ?? "",

  bind: {
    label: "Mail alerts",
  },
});

const user_is_tg_alerts = ref({
  type: "switch",
  name: "user.is_tg_alerts",
  modelValue: props.user?.is_tg_alerts ?? "",

  bind: {
    label: "Telegram alerts",
  },
});

const telegram_ids = ref({
  type: "text",
  name: "telegram_ids",
  // name: "user.tg_user_id",
  // rules: "max:255",
  modelValue: props.user?.user_socs?.map?.((item) => item?.value).join() ?? "",

  bind: {
    label: "Your id in telegram",
    maska: "S#",
    maskaTokens: "S:[0-9,]:multiple",
  },
});
</script>
