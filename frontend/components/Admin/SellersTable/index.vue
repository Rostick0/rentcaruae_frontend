<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">Email</th>
      <th class="table__th">Balance</th>
      <th class="table__th">Last deposite</th>
      <th class="table__th"></th>
    </tr>
    <AdminSellersTableItem v-for="item in data" :key="item?.id" :item="item" />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>
