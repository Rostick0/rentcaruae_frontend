<template>
  <AnyFormBlock title="Work time">
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Monday") }}</strong>
      <VFormComponent :field="monday" />
      <VFormComponent :field="monday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Tuesday") }}</strong>
      <VFormComponent :field="tuesday" />
      <VFormComponent :field="tuesday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Wednesday") }}</strong>
      <VFormComponent :field="wednesday" />
      <VFormComponent :field="wednesday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Thursday") }}</strong>
      <VFormComponent :field="thursday" />
      <VFormComponent :field="thursday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Friday") }}</strong>
      <VFormComponent :field="friday" />
      <VFormComponent :field="friday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Saturday") }}</strong>
      <VFormComponent :field="saturday" />
      <VFormComponent :field="saturday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">{{ $t("Sunday") }}</strong>
      <VFormComponent :field="sunday" />
      <VFormComponent :field="sunday_is_show" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const monday = ref({
  type: "date",
  name: "company_schedules.period.0",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[0]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[0]?.end),
  ],

  bind: {
    label: "Monday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const monday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.0",
  modelValue: !!props.user?.company?.company_schedules?.[0]?.is_show,
});

const tuesday = ref({
  type: "date",
  name: "company_schedules.period.1",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[1]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[1]?.end),
  ],

  bind: {
    label: "Tuesday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const tuesday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.1",
  modelValue: !!props.user?.company?.company_schedules?.[1]?.is_show,
});

const wednesday = ref({
  type: "date",
  name: "company_schedules.period.2",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[2]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[2]?.end),
  ],

  bind: {
    label: "Wednesday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const wednesday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.2",
  modelValue: !!props.user?.company?.company_schedules?.[2]?.is_show,
});

const thursday = ref({
  type: "date",
  name: "company_schedules.period.3",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[3]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[3]?.end),
  ],

  bind: {
    label: "Thursday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const thursday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.3",
  modelValue: !!props.user?.company?.company_schedules?.[3]?.is_show,
});

const friday = ref({
  type: "date",
  name: "company_schedules.period.4",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[4]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[4]?.end),
  ],

  bind: {
    label: "Friday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const friday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.4",
  modelValue: !!props.user?.company?.company_schedules?.[4]?.is_show,
});

const saturday = ref({
  type: "date",
  name: "company_schedules.period.5",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[5]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[5]?.end),
  ],

  bind: {
    label: "Saturday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const saturday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.5",
  modelValue: !!props.user?.company?.company_schedules?.[5]?.is_show,
});

const sunday = ref({
  type: "date",
  name: "company_schedules.period.6",
  rules: "required",
  modelValue: [
    convertTimeToEdit(props.user?.company?.company_schedules?.[6]?.start),
    convertTimeToEdit(props.user?.company?.company_schedules?.[6]?.end),
  ],

  bind: {
    label: "Sunday",
    placeholder: "Time",
    timePicker: true,
    range: true,
  },
});

const sunday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.6",
  modelValue: !!props.user?.company?.company_schedules?.[6]?.is_show,
});
</script>

<style lang="scss" scoped></style>
