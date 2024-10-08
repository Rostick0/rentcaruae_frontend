<template>
  <tr>
    <td class="table__td">{{ item?.id }}</td>
    <td class="table__td">{{ item?.name }}</td>
    <td class="table__td">
      <a class="link" :href="item?.image_url" target="_blank">Show</a>
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="`/admin/brands/${item?.id}/`">Edit</NuxtLink>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
