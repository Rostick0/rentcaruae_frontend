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
    name: "Model cars",
    link: "/admin/model-cars",
  },
  {
    name: "Generations",
    link: "/admin/generations",
  },
  {
    name: "Deposites",
    link: "/admin/deposites",
  },
  {
    name: "Sellers",
    link: "/admin/sellers",
  },
  {
    name: "Verification users",
    link: "/admin/verification-users",
  },
  {
    name: "Register users",
    link: "/admin/user-applications",
  },
  {
    name: "Payments",
    link: "/admin/payments",
  },
  {
    name: "Spendings",
    link: "/admin/spendings",
  },
  {
    name: "Posts",
    link: "/admin/posts",
  },
];

const user = useState("user");

if (user.value?.role !== "admin") {
  // navigateTo("/404");
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
