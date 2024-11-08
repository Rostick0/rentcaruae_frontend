<template>
  <PostCard v-for="post in firstPosts" :key="post?.id" :post="post" />
  <PostsList :posts="otherPosts" />
</template>

<script setup>
const props = defineProps({
  posts: Array,
});

const firstPosts = computed(() => [...props.posts]?.splice(0, 5));
const otherPosts = computed(() => [...props.posts]?.splice?.(5));
</script>
