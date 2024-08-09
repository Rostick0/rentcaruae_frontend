<template>
  <AdminFormBlock title="Work time">
    <div class="form-item__price">
      <strong class="form-item__price_name">Monday</strong>
      <VFormComponent :field="monday" />
      <VFormComponent :field="monday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">Tuesday</strong>
      <VFormComponent :field="tuesday" />
      <VFormComponent :field="tuesday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">Wednesday</strong>
      <VFormComponent :field="wednesday" />
      <VFormComponent :field="wednesday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">Thursday</strong>
      <VFormComponent :field="thursday" />
      <VFormComponent :field="thursday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">Friday</strong>
      <VFormComponent :field="friday" />
      <VFormComponent :field="friday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">Saturday</strong>
      <VFormComponent :field="saturday" />
      <VFormComponent :field="saturday_is_show" />
    </div>
    <div class="form-item__price">
      <strong class="form-item__price_name">Sunday</strong>
      <VFormComponent :field="sunday" />
      <VFormComponent :field="sunday_is_show" />
    </div>
  </AdminFormBlock>
</template>

<script setup>
const user = useState("user");

console.log(user.value?.company?.company_schedules);
const monday = ref({
  type: "date",
  name: "company_schedules.period.0",
  modelValue: "",

  bind: {
    label: "Monday",
    placeholder: "Time",
    timePicker: true,
    range: true,
    // format: "HH:mm",
    timeFormat: "HH:mm",
  },
});

const monday_is_show = ref({
  type: "switch",
  name: "company_schedules.is_show.0",
  modelValue: true,
});

const tuesday = ref({
  type: "date",
  name: "company_schedules.period.1",
  modelValue: "",

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
  modelValue: true,
});

const wednesday = ref({
  type: "date",
  name: "company_schedules.period.2",
  modelValue: "",

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
  modelValue: true,
});

const thursday = ref({
  type: "date",
  name: "company_schedules.period.3",
  modelValue: "",

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
  modelValue: true,
});

const friday = ref({
  type: "date",
  name: "company_schedules.period.4",
  modelValue: "",

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
  modelValue: true,
});

const saturday = ref({
  type: "date",
  name: "company_schedules.period.5",
  modelValue: "",

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
  modelValue: true,
});

const sunday = ref({
  type: "date",
  name: "company_schedules.period.6",
  modelValue: "",

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
  modelValue: true,
});
</script>

<style lang="scss" scoped></style>
