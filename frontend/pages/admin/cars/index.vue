<template>
  <div class="page-cars">
    <h1 class="h1 admin page-cars__title">
      <span>Manage cars</span>
      <NuxtLink class="d-flex" to="/admin/cars/add">
        <UiButton class="page-cars__add" variant="outlined">+ Add car</UiButton>
      </NuxtLink>
    </h1>
    <AdminCarsTable :cars="data" />
    <AdminPagination
      :currentPage="meta?.current_page"
      limit="8"
      :totalCountData="meta?.total"
    />
  </div>
</template>

<script setup>
// const data = [...new Array(8)].map((_, i) => ({
//   id: i,
//   title: "BMW 430i cabrio",
//   is_show: 1,
//   price_periods: [
//     {
//       period: 1,
//       price: 499,
//     },
//     {
//       period: 7,
//       price: 1499,
//     },
//     {
//       period: 30,
//       price: 1499,
//     },
//   ],
//   updated_at: "2023-07-16",
// }));

const { data, meta } = await useApi({
  name: "car.getAll",
  init: true,
  params: {
    extends: "price",
    limit: 8,
  },
});

// console.log(meta.value);

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
