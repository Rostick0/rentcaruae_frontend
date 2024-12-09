<template>
  <div class="page-cars">
    <h1 class="h1 seller page-cars__title">
      <span>Manage cars</span>
      <div class="page-cars__btns">
        <NuxtLink class="d-flex" to="/seller/cars/excel/">
          <UiButton class="page-cars__add" variant="outlined"
            >Get cars excel</UiButton
          >
        </NuxtLink>
        <NuxtLink class="d-flex" to="/seller/cars/add/">
          <UiButton class="page-cars__add" variant="outlined"
            >+ Add car</UiButton
          >
        </NuxtLink>
      </div>
    </h1>
    <div class="page-cars__action">
      <div class="page-cars__refresh">
        <UiButton @click="countSelected > 0 && clickRefresh()"
          >Refresh</UiButton
        >
        <strong class="">
          <div class="text-pre-small">{{ countSelected }} cars</div>
          <div class="text-ui page-cars__refresh_price">AED {{ price }}</div>
        </strong>
      </div>
      <UiSearch
        class="page-cars__action_search"
        v-model="filters['filterLIKE[title]']"
      />
    </div>

    <SellerCarsTable
      :selectValue="countSelected === carsSelected?.length"
      :cars="data"
      :carsSelected="carsSelected"
      @selectCar="(car) => ((carSelected = car), open())"
      @setCarsSelected="changeCarsSelected"
      @changeOneCarSelected="changeOneCarSelected"
      v-model="filters"
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

const user = useState("user");

const { filters } = useFilter({
  withQueryParams: true,
  withInitQueryParams: true,
  initialFilters: {
    "filterLIKE[title]": null,
    page: 1,
    sort: "-id",
  },
});

const { data, get, meta } = await useApi({
  name: "car.getAll",
  params: {
    extends: "price,price_special",
    "filterEQ[user_id]": user.value?.id,
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

const carsIds = await api.car.getMyIds();
const carsSelected = ref(
  await carsIds?.data?.map?.(({ id }) => ({
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
  carsSelected.value = carsSelected.value?.map?.(({ id }) => ({
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

  &__btns {
    display: flex;
    column-gap: 10px;
  }

  &__add {
    font-weight: 700;
    padding: 9.7 5px 15px;
  }

  &__action {
    display: flex;
    column-gap: 152px;
    margin-bottom: 20px;

    &_search {
      width: 100%;
      max-width: 455px;
    }
  }

  &__refresh {
    display: flex;
    align-items: center;
    column-gap: 40px;

    &_price {
      font-size: 20px;
      margin-top: 4px;
    }
  }
}
</style>
