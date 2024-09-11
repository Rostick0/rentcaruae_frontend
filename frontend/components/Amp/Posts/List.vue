<template>
  <div class="posts-oveflow">
    <div class="posts-list">
      <AmpPostsItem v-for="item in posts" :key="item?.id" :post="item" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: Array,
});
</script>

<style lang="scss" scoped>
.posts {
  &-oveflow {
    overflow: auto;
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 16px 24px;
    min-width: 1128px;
  }
}
</style>
