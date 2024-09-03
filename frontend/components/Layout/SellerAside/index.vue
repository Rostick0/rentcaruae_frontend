<template>
  <div class="seller-aside">
    <NuxtLink class="seller-aside__logo">
      <Logo class="seller-aside__logo_inner" />
    </NuxtLink>
    <SellerRefreshUsed />
    <SellerAsideNavigation />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.seller-aside {
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
