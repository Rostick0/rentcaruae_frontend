<template>
  <div class="page-cars">
    <h1 class="h1 seller page-cars__title">
      <span>Manage cars</span>
      <NuxtLink class="d-flex" to="/seller/cars/add">
        <UiButton class="page-cars__add" variant="outlined">+ Add car</UiButton>
      </NuxtLink>
    </h1>
    <div class="page-cars__refresh">
      <UiButton @click="countSelected > 0 && clickRefresh()">Refresh</UiButton>
      <strong class="">
        <div class="text-pre-small">{{ countSelected }} cars</div>
        <div class="text-ui page-cars__refresh_price">AED {{ price }}</div>
      </strong>
    </div>
    <SellerCarsTable
      :cars="data"
      :carsSelected="carsSelected"
      @selectCar="(car) => ((carSelected = car), open())"
      @setCarsSelected="changeCarsSelected"
      @changeOneCarSelected="changeOneCarSelected"
    />
    <AnyPagination
      :currentPage="meta?.current_page"
      limit="8"
      :totalCountData="meta?.total"
      @setPage="(page) => (filters.page = page)"
    />
    <LazySellerCarPromoteModal
      :nameModal="nameModal"
      :carSelected="carSelected"
      :getCars="get"
    />
  </div>
</template>

<script setup>
import api from "~/api";

const page = useState("seller-cars-page", () => 1);

const user = useState("user");

const { filters } = useFilter({
  initialFilters: {
    page,
    sort: "-id",
  },
});

watch(filters.value.page, (newV) => {
  page.value = newV;
});

const { data, get, meta } = await useApi({
  name: "car.getAll",
  params: {
    extends: "price,price_special",
    without_cache: true,
    limit: 8,
  },
  filters,
});

await get();

const nameModal = "specialPrice";
const { open, close } = useModal({
  name: nameModal,
});

const carSelected = ref(null);

const carsSelected = ref(
  data.value?.map(({ id }) => ({
    id,
    value: false,
  }))
);

const countSelected = computed(
  () => carsSelected.value?.filter((item) => item?.value)?.length ?? 0
);

const price = computed(() =>
  getPriceRefreshCars(user.value, countSelected.value)
);

const changeCarsSelected = (value) => {
  carsSelected.value = data.value?.map?.(({ id }) => ({
    id,
    value,
  }));
};

const changeOneCarSelected = ({ id, value }) =>
  (carsSelected.value.find((item) => item?.id === id).value = value);

const clickRefresh = async () => {
  const cars = carsSelected.value?.filter((item) => item?.value);

  const res = await api.promoCars.create({
    data: {
      cars: cars?.map((item) => item?.id)?.join(","),
    },
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    return;
  }

  try {
    const difference = user.value.refresh_car.count - cars?.length;
    user.value.refresh_car.count = difference > 0 ? difference : 0;
  } catch {}

  success("Sucess");

  carsSelected.value = carsSelected.value?.map?.((item) => ({
    ...item,
    value: false,
  }));
};

definePageMeta({
  layout: "seller",
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

  &__refresh {
    display: flex;
    align-items: center;
    column-gap: 40px;
    margin-bottom: 20px;

    &_price {
      font-size: 20px;
      margin-top: 4px;
    }
  }
}
</style>
