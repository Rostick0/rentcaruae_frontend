<template>
  <AuthModalTemplate
    title="Become a partnership"
    subtitle="For Rent a car companies"
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
      <UiButton class="auth-modal__btn" variant="outlined"
        >Send a request</UiButton
      >
      <div class="auth-modal__checkbox">
        <VFormComponent :field="is_agree">
          By ticking this box, you agree to the
          <NuxtLink to="/terms_of_service" target="_blank"
            >Terms of Service</NuxtLink
          >
          <br />and
          <NuxtLink to="/privacy_policy" target="_blank"
            >Privacy Policy</NuxtLink
          >, including cookie use.
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

const company_name = ref({
  type: "text",
  name: "company_name",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: "Company Name",
    placeholder: "My Company",
  },
});

const company_website = ref({
  type: "text",
  name: "company_website",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: "Company Website",
    placeholder: "https://",
  },
});

const company_city_id = ref({
  type: "select",
  name: "company_city_id",
  rules: "required",
  modelValue: {},

  bind: {
    label: "City",
    placeholder: "City",
    options: useState("cities"),
  },
});

const full_name = ref({
  type: "text",
  name: "full_name",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: "Full Name",
    placeholder: "Full Name",
  },
});

const tel = ref({
  type: "tel",
  name: "tel",
  rules: "required",
  modelValue: "",

  bind: {
    label: "Phone number",
  },
});

const email = ref({
  type: "text",
  name: "email",
  rules: "required|email|max:255",
  modelValue: "",

  bind: {
    label: "Work email",
    placeholder: "email@company_name.com",
  },
});

const code = ref({
  type: "text",
  name: "code",
  rules: "required|min:6|max:6",
  modelValue: "",

  bind: {
    label: "Enter pin code",
    placeholder: "Pin code",
    maska: "######",
  },
});

const is_agree = ref({
  type: "checkbox",
  name: "is_agree",
  modelValue: false,
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

const onSubmit = handleSubmit(async ({ tel, city_id, ...values }) => {
  if (isSendedCode.value) return;

  isSendedCode.value = true;

  const data = {
    ...values,
    tel: convertPhoneToDb(tel),
    type: "register",
    company_city_id: values?.company_city_id?.id,
  };

  const res = await api.emailCode.create({
    data,
  });

  g_recaptcha_response.value.modelValue = "";

  if (res?.error) {
    warningPopup("Code don't sended");
    isSendedCode.value = false;
    return;
  }

  formValues.value = data;
});

watch(
  () => code.value.modelValue,
  debounce(async (newValue) => {
    if (newValue.length !== 6) return;

    const errors = await register({
      ...formValues.value,
      code: newValue,
    });

    if (errors) {
      setErrors(errors);

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
@import "./../../assets/scss/components/auth-modal";
</style>
