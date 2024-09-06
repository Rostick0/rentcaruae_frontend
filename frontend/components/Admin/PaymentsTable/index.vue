<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">User</th>
      <th class="table__th">Deposite</th>
      <th class="table__th">Date</th>
    </tr>
    <AdminPaymentsTableItem v-for="item in data" :key="item?.id" :item="item" />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>
