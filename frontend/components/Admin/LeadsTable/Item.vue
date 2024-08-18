<template>
  <tr class="table_tr">
    <td class="table__td">
      {{ moment(lead?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <div class="margin-center width-fit-content">
        {{ lead?.car?.generation?.model_car?.brand?.name }} <br />{{
          lead?.car?.generation?.model_car?.name
        }}
      </div>
    </td>
    <td class="table__td">{{ lead?.full_name }}</td>
    <td class="table__td">
      {{ lead?.email }}
    </td>
    <td class="table__td">
      {{ lead?.tel }}
    </td>
    <td class="table__td">
      {{ lead?.period }}
    </td>
    <td class="table__td">AED {{ formatNumber(lead?.price) }}</td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  lead: Object,
});
</script>

<style lang="scss" scoped></style>
