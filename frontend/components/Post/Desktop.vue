<template>
  <PostCard :post="postFirst" />
  <PostsList :posts="otherPosts" />
</template>

<script setup>
const props = defineProps({
  posts: Array,
});

const postFirst = computed(() => props.posts?.[0]);
const otherPosts = computed(() => props.posts?.splice?.(1));
</script>
