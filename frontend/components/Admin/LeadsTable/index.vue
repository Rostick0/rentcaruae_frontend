<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Date</th>
      <th class="table__th">Car</th>
      <th class="table__th">Name</th>
      <th class="table__th">E-mail</th>
      <th class="table__th">Phone</th>
      <th class="table__th">Rental</th>
      <th class="table__th">Price</th>
    </tr>
    <tbody>
      <AdminLeadsTableItem v-for="lead in leads" :key="lead.id" :lead="lead" />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  leads: Array,
});
</script>

<style lang="scss" scoped></style>
