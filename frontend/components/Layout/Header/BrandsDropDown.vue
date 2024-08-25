<template>
  <div class="header-brands-drop-down">
    <NuxtLink
      class="header-brands-drop-down__link"
      v-for="link in links"
      :key="link?.id"
      :to="link?.link"
    >
      <LazyNuxtImg
        :src="$config.public.BACK_URL + link?.image_url"
        :alt="link?.name"
        loading="lazy"
        width="40"
        height="40"
      />
      <span>{{ link?.name }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  links: Array,
});
</script>

<style lang="scss" scoped>
.header-brands-drop-down {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0px 8px 4px 0px #00000040;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 20px;
  padding: 20px;

  &__link {
    display: flex;
    align-items: center;
    column-gap: 8px;
    transition: 0.3s;

    &:hover {
      color: var(--color-basic);
    }
  }
}
</style>
