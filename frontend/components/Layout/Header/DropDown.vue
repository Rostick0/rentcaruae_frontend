<template>
  <div class="header-drop-down">
    <NuxtLink
      class="header-drop-down__link"
      v-for="link in links"
      :key="link?.id"
      :to="link?.link"
      @click="emits('close', true)"
    >
      {{ link?.name }}
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
.header-drop-down {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0px 8px 4px 0px #00000040;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 20px;

  &__link {
    font-size: 14px;
    letter-spacing: 0.02em;
    transition: 0.3s;

    &:hover {
      color: var(--color-basic);
    }
  }
}
</style>
