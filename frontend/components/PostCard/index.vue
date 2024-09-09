<template>
  <NuxtLink class="post-card" :to="`/blogs/${post?.title_link}`">
    <div class="post-card__image">
      <LazyNuxtImg
        class="post-card__img"
        :src="post?.image?.image?.path_webp"
        :alt="post?.title"
        decoding="async"
        loading="lazy"
        height="300"
      />
    </div>
    <div class="post-card__content">
      <h3 class="post-card__title">{{ post?.title }}</h3>
      <div class="post-card__description">{{ post?.short_description }}</div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
.post-card {
  background-color: var(--color-white);
  border-radius: 8px;
  display: flex;
  overflow: hidden;

  &__image {
    display: flex;
    flex-grow: 1;
  }

  &__img {
    object-fit: cover;
    width: 100%;
  }

  &__content {
    flex-basis: 44%;
    padding: 16px 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
}
</style>
