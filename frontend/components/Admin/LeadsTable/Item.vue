<template>
  <tr class="table_tr">
    <td class="table__td">
      {{ moment(car?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td text-left">
      {{ car?.brand?.name }} <br />{{ car?.model?.name }}
    </td>
    <td class="table__td">{{ car?.user?.name }}</td>
    <td class="table__td">
      {{ car?.user?.email }}
    </td>
    <td class="table__td">
      {{ car?.user?.tel }}
    </td>
    <td class="table__td">
      {{ car?.rental }}
    </td>
    <td class="table__td">AED {{ car?.price }}</td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  car: Object,
});
</script>

<style lang="scss" scoped></style>
