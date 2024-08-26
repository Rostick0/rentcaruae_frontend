<template>
  <div class="profile-form form__flex">
    <form class="form__fields" @submit="onSubmit">
      <AdminProfileFormCompany />
      <AdminProfileFormCompanySchedules />
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
    </form>
    <div class="form__flex_right">
      <AdminProfileFormVerificationStatus />
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import useImage from "~/composables/useImage";
import api from "~/api";

const user = useState("user");

const { getFileFrom } = useFile();
const { getImageFrom } = useImage();

const { handleSubmit, setErrors, values } = useForm();

const onSubmit = handleSubmit(
  async ({ image, license, sertificate, company_schedules, ...values }) => {
    const data = {
      ...values,
      company_schedules: {
        start: [],
        end: [],
        is_show: company_schedules?.is_show,
      },
    };

    data.user.tel = convertPhoneToDb(data?.user?.tel);
    data.company.city_id = data?.company?.city_id?.id;

    const image_id = await getImageFrom(image).then((res) => res?.id);
    const license_id = await getFileFrom(license).then((res) => res?.id);
    const sertificate_id = await getFileFrom(sertificate).then(
      (res) => res?.id
    );

    company_schedules?.period?.forEach?.((item) => {
      const [start, end] = convertTimeToDb(item);

      data.company_schedules.start.push(start);
      data.company_schedules.end.push(end);
    });

    const res = await api.companies.update({
      id: user.value?.company?.id,
      data: {
        ...data,
        image: image_id,
        license: license_id,
        sertificate: sertificate_id,
      },
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }
  }
);

const is_show = ref({
  type: "switch",
  name: "is_show",
  modelValue: !!user.value?.is_show,

  bind: {
    label: "Publish on website",
  },
});
</script>
