<template>
  <NuxtLink class="link-more" :to="to">
    <span class="ui-text">{{ name }}</span>
    <svg
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
</template>

<script setup>
const props = defineProps({
  to: String,
  name: String,
});
</script>

<style lang="scss" scoped>
.link-more {
  display: flex;
  align-items: center;
  column-gap: 4px;
}
</style>
