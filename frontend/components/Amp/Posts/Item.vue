<template>
  <NuxtLink
    class="post-item"
    :to="`/blogs/${post?.title_link}/`"
    itemscope
    itemtype="https://schema.org/Article"
  >
    <link
      itemprop="mainEntityOfPage"
      :href="`${$config.public.BASE_URL}/blogs/${post?.title_link}`"
    />
    <meta itemprop="author" :content="post?.user?.full_name" />
    <meta
      itemprop="datePublished"
      :content="post?.created_at"
    />
    <meta
      itemprop="dateModified"
      :content="post?.updated_at"
    />
    <meta itemprop="articleSection" :content="post?.post_category?.name" />
    <meta itemprop="articleBody" :content="post?.content" />
    <div class="post-item__image">
      <amp-img
        class="post-item__img"
        :src="post?.image?.image?.path_webp"
        :alt="post?.title"
        width="264"
        height="166"
        layout="responsive"
        itemprop="image"
      />
    </div>
    <div class="post-item__content">
      <h3 class="post-item__title" itemprop="headline">{{ post?.title }}</h3>
      <p class="post-item__description text-pre-small" itemprop="description">
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
  width: 264px;

  &__image {
    display: flex;
  }

  &__img {
    border-radius: 8px 8px 0 0;
    width: 264px;
    height: 166px;

    img {
      object-fit: cover;
    }
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
