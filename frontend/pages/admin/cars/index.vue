<template>
  <div class="page-cars">
    <h1 class="h1 admin page-cars__title">
      <span>Manage cars</span>
      <UiButton class="page-cars__add" variant="outlined">+ Add car</UiButton>
    </h1>
    <AdminCarsTable :cars="data" />
    <AdminPagination currentPage="1" limit="8" totalCountData="40" />
  </div>
</template>

<script setup>
const data = [...new Array(8)].map((_, i) => ({
  id: i,
  title: "BMW 430i cabrio",
  is_show: 1,
  price_periods: [
    {
      period: 1,
      price: 499,
    },
    {
      period: 7,
      price: 1499,
    },
    {
      period: 30,
      price: 1499,
    },
  ],
  updated_at: "2023-07-16",
}));

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

  &__add {
    font-weight: 700;
    padding: 9.7 5px 15px;
  }
}
</style>
