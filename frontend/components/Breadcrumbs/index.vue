<template>
  <div class="breadcrumbs">
    <template v-for="(item, index) in breadcrumbs" :key="index">
      <NuxtLink class="breadcrumbs__item" v-if="item?.link" :to="item?.link">
        <span class="breadcrumbs__item_name">{{ item?.name }}</span>
        <svg
          v-if="lastIndex !== index"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z"
            fill="#221EE3"
          />
        </svg>
      </NuxtLink>
      <span v-else class="breadcrumbs__item">
        <span class="breadcrumbs__item_name">{{ item?.name }}</span>
        <svg
          v-if="lastIndex !== index"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z"
            fill="#221EE3"
          />
        </svg>
      </span>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: Array,
});

const lastIndex = computed(() => (props?.breadcrumbs?.length ?? 1) - 1);
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  grid-gap: 4px;
  flex-wrap: wrap;
  padding-top: 4px;
  margin-bottom: 24px;

  &__item {
    display: flex;
    align-items: center;
    column-gap: 4px;
    font-size: 12px;
    font-weight: 700;
  }
}
</style>
