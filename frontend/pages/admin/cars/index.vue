<template>
  <div class="page-cars">
    <h1 class="h1 admin page-cars__title">
      <span>Manage cars</span>
      <UiButton variant="outlined">+ Add car</UiButton>
    </h1>
    <AdminPagination currentPage="1" limit="8" totalCountData="40" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss" scoped>
.page-cars {
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
