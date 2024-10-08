<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.name }}</td>
    <td class="table__td">
      {{ item?.model_car?.name }}
    </td>
    <td class="table__td">
      {{ item?.model_car?.brand?.name }}
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/generations/${item?.id}/`"
        >Edit</NuxtLink
      >
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
