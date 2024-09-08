<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">Title</th>
      <th class="table__th">Category</th>
      <th class="table__th">Created</th>
      <th class="table__th"></th>
    </tr>
    <AdminPostsTableItem v-for="item in data" :key="item?.id" :item="item" />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>
