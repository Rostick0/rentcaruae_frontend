<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">Email</th>
      <th class="table__th">Company name</th>
      <th class="table__th">Created at</th>
      <th class="table__th"></th>
    </tr>
    <AdminVerificationUsersItem
      v-for="item in data"
      :key="item?.id"
      :item="item"
    />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>
