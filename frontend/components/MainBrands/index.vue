<template>
  <div class="brands">
    <div class="brands__top">
      <h2 class="brands__title">Most wanted car brands in Dubai</h2>
      <LinkMore name="All brands" to="/" />
    </div>
    <Brands :brands="brands" />
  </div>
</template>

<script setup>
const { data, get } = await useApi({
  name: "brands.getAll",
  params: {
    extendsCount: "cars",
    sort: "cars_count,-name",
    limit: 12,
  },
});

await get();

const config = useRuntimeConfig();

const brands = computed(() =>
  data.value?.map?.((item) => ({
    ...item,
    image_url: config.public.BACK_URL + item.image_url,
  }))
);
</script>

<style lang="scss" scoped>
.brands {
  margin-bottom: 40px;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    margin-bottom: 14px;
  }

  // &__more {
  //   display: flex;
  //   align-items: center;
  //   column-gap: 4px;
  // }
}
</style>
