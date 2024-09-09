<template>
  <NuxtLink class="post-item" :to="`/blogs/${post?.title_link}`">
    <div class="post-item__image">
      <LazyNuxtImg
        class="post-item__img"
        :src="post?.image?.image?.path_webp"
        :alt="post?.title"
        decoding="async"
        loading="lazy"
        width="264"
        height="166"
      />
    </div>
    <div class="post-item__content">
      <h3 class="post-item__title">{{ post?.title }}</h3>
      <p class="post-item__description text-pre-small">
        {{ post?.short_description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
.post-item {
  display: flex;
  flex-direction: column;

  &__image {
    display: flex;
  }

  &__img {
    border-radius: 8px 8px 0 0;
    object-fit: cover;
    width: 264px;
    height: 166px;
  }

  &__title {
    font-size: 16px;
    margin-bottom: 4px;
  }

  &__content {
    background-color: var(--color-white);
    border-radius: 0 0 8px 8px;
    flex-grow: 1;
    padding: 8px;
  }
}
</style>
