<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.user?.email }}</td>
    <td class="table__td">
      {{ item?.deposite?.price }}
    </td>
    <td class="table__td">
      {{ moment(item?.created_at).format("DD MMM YYYY") }}
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
});
</script>
