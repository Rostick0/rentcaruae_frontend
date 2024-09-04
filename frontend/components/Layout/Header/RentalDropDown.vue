<template>
  <div class="header-rental-drop-down">
    <div
      class="header-rental-drop-down-item"
      v-for="item in list"
      :key="item?.name"
    >
      <div class="header-rental-drop-down-item__title text-ui">
        {{ item?.name }}
      </div>
      <div
        class="header-rental-drop-down-item__list"
        v-for="link in item?.links"
        :key="link?.link"
      >
        <NuxtLink
          class="header-rental-drop-down-item__item"
          @click="emits('close', true)"
          :to="link?.link"
        >
          {{ link?.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: Array,
  close: Function,
});

const emits = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.header-rental-drop-down {
  background-color: var(--color-white);
  display: flex;
  margin-top: 8px;

  &-item {
    padding: 20px;

    &:first-child {
      border-radius: 8px 0 0 8px;
    }

    &:last-child {
      background-color: var(--color-grey);
      border-radius: 0 8px 8px 0;
    }

    &__title {
      margin-bottom: 8px;
      text-wrap: nowrap;
      white-space: nowrap;
    }

    &__item {
      font-size: 14px;
      letter-spacing: 0.02em;
      padding: 8px;
      transition: 0.3s;

      &:hover {
        color: var(--color-basic);
      }
    }
  }
}
</style>
