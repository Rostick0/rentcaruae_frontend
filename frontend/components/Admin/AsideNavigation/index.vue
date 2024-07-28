<template>
  <div class="admin-aside__links">
    <NuxtLink
      class="admin-aside__link"
      :class="{
        active: route.fullPath.split('/')[2] === link.link.split('/')[2],
      }"
      v-for="link in links"
      :to="link.link"
      :key="link.link"
      >{{ link.name }}
    </NuxtLink>
    <NuxtLink class="admin-aside__link" to="/">Logout</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();

const links = [
  {
    name: "Dashboard",
    link: "/admin",
  },
  {
    name: "Manage cars",
    link: "/admin/cars",
  },
  {
    name: "Leads",
    link: "/admin/leads",
  },
  {
    name: "Profile",
    link: "/admin/profile",
  },
];
</script>

<style lang="scss" scoped>
.admin-aside {
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
