<template>
  <tr>
    <td class="table__td">{{ item?.user_identifier }}</td>
    <td class="table__td">{{ item?.email }}</td>
    <td class="table__td">
      {{ item?.sum }}
    </td>
    <td class="table__td">
      {{ moment(item?.date).format("DD MMM YYYY") }}
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
});
</script>
