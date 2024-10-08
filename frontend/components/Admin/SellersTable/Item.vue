<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.email }}</td>
    <td class="table__td">
      {{ item?.balance }}
    </td>
    <td class="table__td">
      {{ item?.deposite_last?.created_at ? moment(item?.deposite_last?.created_at).format("DD MMM YYYY") : '-' }}
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/sellers/${item?.id}/`">Edit</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
});
</script>
