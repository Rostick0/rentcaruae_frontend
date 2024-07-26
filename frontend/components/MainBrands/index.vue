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
const brands = [
  {
    id: 1,
    name: "a",
    image: "images/fake/Logos.png",
  },
  {
    id: 2,
    name: "a",
    image: "images/fake/Logos (1).png",
  },
  {
    id: 3,
    name: "a",
    image: "images/fake/Logos (2).png",
  },
];
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
