<template>
  <div class="admin-aside">
    <NuxtLink class="admin-aside__logo">
      <Logo class="admin-aside__logo_inner" />
    </NuxtLink>
    <AdminRefreshUsed />
    <AdminAsideNavigation />
  </div>
</template>

<script setup>
// const {} = await useAuth();
</script>

<style lang="scss" scoped>
.admin-aside {
  background-color: var(--color-text100);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  padding: 20px;

  &__logo {
    display: flex;
    margin-bottom: 25px;

    &_inner {
      color: var(--color-white);
    }
  }
}
</style>
