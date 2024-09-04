<template>
  <div class="header-brands-drop-down">
    <NuxtLink
      class="header-brands-drop-down__link"
      v-for="link in links"
      :key="link?.id"
      @click="emits('close', true)"
      :to="link?.link"
    >
      <LazyNuxtImg
        :src="link?.image_url + '?=w60'"
        :title="link?.name"
        :alt="`${link?.name} for rent`"
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

const emits = defineEmits(["close"]);
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
  overflow: auto;

  &__link {
    display: flex;
    align-items: center;
    column-gap: 8px;
    transition: 0.3s;

    &:hover {
      color: var(--color-basic);
    }
  }

  @media (max-width: 1024px) {
    max-width: calc(100vw - 40px);
  }

  // @media (max-width: 680px) {
  //   grid-template-columns: repeat(2, 1fr );
  // }
}
</style>
