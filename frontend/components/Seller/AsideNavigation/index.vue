<template>
  <div class="seller-aside__links">
    <NuxtLink
      class="seller-aside__link"
      :class="{
        active: route.fullPath.split('/')[2] === link.link.split('/')[2],
      }"
      v-for="link in links"
      :to="link.link"
      :key="link.link"
      >{{ link.name }}
    </NuxtLink>
    <NuxtLink class="seller-aside__link" to="/">Logout</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();

const links = [
  {
    name: "Dashboard",
    link: "/seller",
  },
  {
    name: "Manage cars",
    link: "/seller/cars",
  },
  {
    name: "Leads",
    link: "/seller/leads",
  },
  {
    name: "Profile",
    link: "/seller/profile",
  },
];
</script>

<style lang="scss" scoped>
.seller-aside {
  &__links {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    row-gap: 26px;
    margin-top: 70px;
  }

  &__link {
    color: var(--color-white);
    transition: 0.3s;

    &.active {
      color: var(--color-basic);
    }

    &:last-child {
      margin-top: auto;
    }
  }
}
</style>
