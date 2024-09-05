<template>
  <div class="any-aside__links">
    <NuxtLink
      class="any-aside__link"
      :class="{
        active: route.fullPath.split('/')[2] === link.link.split('/')[2],
      }"
      v-for="link in navigations"
      :to="link.link"
      :key="link.link"
      >{{ link.name }}
    </NuxtLink>
    <NuxtLink class="any-aside__link" @click.prevent="logout('/')" to="/"
      >Logout</NuxtLink
    >
  </div>
</template>

<script setup>
const { logout } = await useAuth();

const route = useRoute();

const props = defineProps({
  navigations: Array,
});
</script>

<style lang="scss" scoped>
.any-aside {
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
