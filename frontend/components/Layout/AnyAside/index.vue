<template>
  <div class="any-aside">
    <NuxtLink class="any-aside__logo">
      <Logo class="any-aside__logo_inner" />
    </NuxtLink>
    <slot name="aside-pre-top" />
    <AnyAsideNavigation :navigations="navigations" />
  </div>
</template>

<script setup>
const props = defineProps({
  navigations: Array,
});
</script>

<style lang="scss" scoped>
.any-aside {
  background-color: var(--color-text100);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  padding: 20px;

  &__logo {
    display: flex;
    margin-bottom: 25px;

    .any-aside__logo_inner {
      color: var(--color-white);
    }
  }
}
</style>
