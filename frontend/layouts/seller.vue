<template>
  <div class="wrapper">
    <LayoutAnyAside :navigations="navigations">
      <template #aside-pre-top>
        <SellerRefreshUsed />
      </template>
    </LayoutAnyAside>
    <div class="wrapper__content">
      <LayoutSellerHeader />
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
    link: "/seller/",
  },
  {
    name: "Manage cars",
    link: "/seller/cars/",
  },
  {
    name: "Bookings",
    link: "/seller/bookings/",
  },
  {
    name: "Profile",
    link: "/seller/profile/",
  },
];

const user = useState("user");

if (!["admin", "seller"].includes(user.value?.role)) {
  navigateTo("/404");
}
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
