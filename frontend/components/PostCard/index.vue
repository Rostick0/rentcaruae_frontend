<template>
  <NuxtLink
    class="post-card"
    v-if="post"
    :to="$localePath(`/blogs/${post?.title_link}/`)"
    itemscope
    itemtype="https://schema.org/Article"
  >
    <link
      itemprop="mainEntityOfPage"
      :href="`${$config.public.BASE_URL}/blogs/${post?.title_link}`"
    />
    <meta itemprop="author" :content="post?.user?.full_name" />
    <meta itemprop="datePublished" :content="post?.created_at" />
    <meta itemprop="dateModified" :content="post?.updated_at" />
    <meta itemprop="articleSection" :content="post?.post_category?.name" />
    <meta itemprop="articleBody" :content="post?.content" />
    <div class="post-card__image">
      <NuxtImg
        class="post-card__img"
        :src="post?.image?.image?.path_webp"
        :alt="post?.title"
        preload
        height="300"
        itemprop="image"
      />
    </div>
    <div class="post-card__content">
      <h3 class="post-card__title" itemprop="headline">{{ post?.title }}</h3>
      <div class="post-card__description" itemprop="description">
        {{ post?.short_description }}
      </div>
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
</style>
