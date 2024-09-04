<template>
  <div class="wrapper">
    <LayoutAnyAside :navigations="navigations" />
    <div class="wrapper__content">
      <!-- <LayoutSellerHeader /> -->
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const navigations = [
  {
    name: "Dashboard",
    link: "/admin",
  },
  {
    name: "Brands",
    link: "/admin/brands",
  },
  {
    name: "Deposites",
    link: "/admin/deposties",
  },
  {
    name: "Sellers",
    link: "/admin/sellers",
  },
  {
    name: "Payments",
    link: "/admin/payments",
  },
];
</script>

<style lang="scss" scoped>
.wrapper {
  flex-direction: row;
  max-height: 100vh;

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}

.main {
  flex-grow: 1;
  padding: 25px 40px;
  overflow: auto;
}
</style>
