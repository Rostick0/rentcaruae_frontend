<template>
  <tr class="table_tr">
    <td class="table__td">
      {{ moment(booking?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <div class="margin-center width-fit-content">
        {{ booking?.car?.generation?.model_car?.brand?.name }} <br />{{
          booking?.car?.generation?.model_car?.name
        }}
      </div>
    </td>
    <td class="table__td">{{ booking?.full_name }}</td>
    <td class="table__td">
      {{ booking?.email }}
    </td>
    <td class="table__td">
      {{ booking?.tel }}
    </td>
    <td class="table__td">
      {{ moment(booking?.start_date).format("DD MMM YYYY") }} -
      {{ dateEnd }} ({{ booking?.period }})
    </td>
    <td class="table__td">
      <UiSwitch :modelValue="booking?.without_deposite"></UiSwitch>
    </td>
    <td class="table__td">AED {{ formatNumber(booking?.price) }}</td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  booking: Object,
});

const dateEnd = computed(() =>
  moment(props?.booking?.start_date)
    .add("days", props?.booking?.period)
    .format("DD MMM YYYY")
);
</script>

<style lang="scss" scoped></style>
