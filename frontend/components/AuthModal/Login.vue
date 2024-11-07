<template>
  <AuthModalTemplate title="Login" subtitle="For Rent a car companies">
    <form @submit="onSubmit">
      <div class="auth-modal__fields">
        <VFormComponent :field="email" />
        <VFormComponent v-if="isSendedCode" :field="code" />
      </div>
      <UiButton class="auth-modal__btn" variant="outlined">Login</UiButton>
      <VFormComponent :field="g_recaptcha_response" />
    </form>
  </AuthModalTemplate>
</template>

<script setup>
import debounce from "lodash/debounce";
import { useForm } from "vee-validate";
import api from "~/api";

const emits = defineEmits(["closeModal"]);

const isSendedCode = ref(false);

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

const g_recaptcha_response = ref({
  type: "recaptcha",
  name: "g_recaptcha_response",
  modelValue: "",
});

const { login } = await useAuth();
const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async (values) => {
  if (isSendedCode.value) return;

  isSendedCode.value = true;

  const res = await api.emailCode.create({
    data: {
      ...values,
      type: "login",
    },
  });

  g_recaptcha_response.value.modelValue = "";

  if (res?.error) {
    warningPopup("Code don't sended");
    isSendedCode.value = false;
  }
});

watch(
  () => code.value.modelValue,
  debounce(async (newValue) => {
    if (newValue.length !== 6) return;

    const errors = await login(
      {
        email: email.value.modelValue,
        code: newValue,
      },
      true
    );

    if (errors) {
      setErrors(errors?.errors);

      if (errors?.email) {
        isSendedCode.value = false;
      }
      return;
    }

    emits("closeModal", true);
  }, 200)
);
</script>

<style lang="scss" scoped>
@forward "./../../assets/scss/components/auth-modal";
</style>
