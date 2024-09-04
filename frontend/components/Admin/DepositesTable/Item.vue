<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.price }}</td>
    <td class="table__td">{{ item?.free_leads }}</td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/deposites/${item?.id}`">Edit</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
