<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.user?.email }}</td>
    <td class="table__td">
      {{ item?.user?.company?.name }}
    </td>
    <td class="table__td">
      {{ moment(item?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/sellers/${item?.user_id}/`"
        >Show</NuxtLink
      >
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  item: Object,
});
</script>
