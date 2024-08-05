<template>
  <div class="page-cars">
    <h1 class="h1 admin page-cars__title">
      <span>Manage cars</span>
      <NuxtLink class="d-flex" to="/admin/cars/add">
        <UiButton class="page-cars__add" variant="outlined">+ Add car</UiButton>
      </NuxtLink>
    </h1>
    <AdminCarsTable
      :cars="data"
      @selectCar="(car) => ((carSelected = car), open())"
    />
    <AdminPagination
      :currentPage="meta?.current_page"
      limit="8"
      :totalCountData="meta?.total"
      @setPage="(page) => (filters.page = page)"
    />
    <LazyAdminCarPromoteModal
      :nameModal="nameModal"
      :carSelected="carSelected"
    />
  </div>
</template>

<script setup>
const { filters } = useFilter({
  initialFilters: {
    page: 1,
    sort: "-id",
  },
});

const { data, meta } = await useApi({
  name: "car.getAll",
  init: true,
  params: {
    extends: "price",
    limit: 8,
  },
  filters,
});

const nameModal = "specialPrice";
const { open, close } = useModal({
  name: nameModal,
});

const carSelected = ref();

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
