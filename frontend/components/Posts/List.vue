<template>
  <div class="posts-list">
    <PostsItem v-for="item in posts" :key="item?.id" :post="item" />
  </div>
</template>

<script setup>
const props = defineProps({
  posts: Array,
});
</script>

<style lang="scss" scoped>
.posts-list {
  display: grid;
  grid-gap: 16px 24px;
  grid-template-columns: repeat(auto-fit, minmax(264px, 264px));
  overflow: auto;
}
</style>
