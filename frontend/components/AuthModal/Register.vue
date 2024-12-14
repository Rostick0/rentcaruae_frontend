<template>
  <AuthModalTemplate
    :title="$t('modal.register.title')"
    :subtitle="$t('modal.register.subtitle')"
  >
    <form @submit="onSubmit">
      <div class="auth-modal__fields">
        <VFormComponent :field="company_name" />
        <VFormComponent :field="company_website" />
        <VFormComponent :field="company_city_id" />
      </div>
      <div class="auth-modal__hr"></div>
      <div class="auth-modal__fields">
        <VFormComponent :field="full_name" />
        <VFormComponent :field="tel" />
        <VFormComponent :field="email" />
        <VFormComponent v-if="isSendedCode" :field="code" />
      </div>
      <UiButton class="auth-modal__btn" variant="outlined">{{
        $t("modal.register.sendRequest")
      }}</UiButton>
      <div class="auth-modal__checkbox">
        <VFormComponent :field="is_agree">
          {{ $t("bookForm.TickingBoxAgree") }}
          <NuxtLink :to="$localePath('/terms_of_service/')" target="_blank">{{
            $t("termsService")
          }}</NuxtLink>
          <br />{{ $t("bookForm.and") }}
          <NuxtLink :to="$localePath('/privacy_policy/')" target="_blank">{{
            $t("privacyPolicy")
          }}</NuxtLink
          >, {{ $t("bookForm.includingCookie") }}
        </VFormComponent>
      </div>
      <VFormComponent :field="g_recaptcha_response" />
    </form>
  </AuthModalTemplate>
</template>

<script setup>
import debounce from "lodash/debounce";
import { useForm } from "vee-validate";
import api from "~/api";

const isSendedCode = ref(false);

const { t } = useI18n();

const company_name = ref({
  type: "text",
  name: "company_name",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: t("modal.register.company_name.label"),
    label: t("modal.register.company_name.placeholder"),
  },
});

const company_website = ref({
  type: "text",
  name: "company_website",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: t("modal.register.company_website.label"),
    placeholder: t("modal.register.company_website.placeholder"),
  },
});

const company_city_id = ref({
  type: "select",
  name: "company_city_id",
  rules: "required",
  modelValue: {},

  bind: {
    label: t("modal.register.company_city_id.label"),
    placeholder: t("modal.register.company_city_id.placeholder"),
    options: useState("translatedCities"),
  },
});

const full_name = ref({
  type: "text",
  name: "full_name",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: t("modal.register.full_name.label"),
    placeholder: t("modal.register.full_name.placeholder"),
  },
});

const tel = ref({
  type: "tel",
  name: "tel",
  rules: "required",
  modelValue: "",

  bind: {
    label: t("modal.register.tel.label"),
  },
});

const email = ref({
  type: "text",
  name: "email",
  rules: "required|email|max:255",
  modelValue: "",

  bind: {
    label: t("modal.register.email.label"),
    placeholder: t("modal.register.email.placeholder"),
  },
});

const code = ref({
  type: "text",
  name: "code",
  rules: "required|min:6|max:6",
  modelValue: "",

  bind: {
    label: t("modal.register.code.label"),
    placeholder: t("modal.register.code.placeholder"),
    maska: "######",
  },
});

const is_agree = ref({
  type: "checkbox",
  name: "is_agree",
  modelValue: true,
  rules: "required",

  bind: {
    variant: "grey-small",
  },
});

const g_recaptcha_response = ref({
  type: "recaptcha",
  name: "g_recaptcha_response",
  modelValue: "",
});

const formValues = ref();
const authModalState = useState("authModalState");

const { register } = await useAuth();
const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(
  async ({ tel, city_id, company_city_id, ...values }) => {
    if (isSendedCode.value) return;

    isSendedCode.value = true;

    const data = {
      ...values,
      tel: convertPhoneToDb(tel),
      type: "register",
      company_city_id: company_city_id?.id,
    };

    const res = await api.emailCode.create({
      data,
    });

    g_recaptcha_response.value.modelValue = "";

    if (res?.error) {
      warningPopup("Code don't sended");
      isSendedCode.value = false;

      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    formValues.value = data;
  }
);

watch(
  () => code.value.modelValue,
  debounce(async (newValue) => {
    if (newValue.length !== 6) return;

    const errors = await register({
      ...formValues.value,
      code: newValue,
    });

    if (errors) {
      setErrors(errors?.errors);

      if (errors?.email) {
        isSendedCode.value = false;
      }
      return;
    }

    authModalState.value = "register_success";
  }, 200)
);
</script>

<style lang="scss" scoped>
@forward "./../../assets/scss/components/auth-modal";
</style>
