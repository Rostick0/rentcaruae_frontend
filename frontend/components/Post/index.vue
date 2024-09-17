<template>
  <div class="post">
    <div class="post__image">
      <NuxtImg
        class="post__img"
        :src="post?.image?.image?.path_webp"
        :alt="post?.title"
        preload
        height="520"
      />
    </div>
    <div class="post__container">
      <div class="post__container_left">
        <time
          class="post__datetime text-pre-small"
          :datetime="date?.created_at"
        >
          {{ moment(post?.created_at).format("DD.MM.yyyy") }}
        </time>
        <h1 class="h1 post__title">{{ post?.title }}</h1>
        <div class="post__content" v-html="post?.content"></div>
      </div>
      <div class="post__container_right">
        <CarCardItem :car="post?.car" />
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
.post {
  &__image {
    display: flex;
    margin-bottom: 16px;
  }

  &__img {
    object-fit: cover;
    width: 100%;
    max-height: 520px;
  }

  &__container {
    display: flex;
    align-items: flex-start;
    grid-gap: 24px 20px;

    &_left {
      flex-shrink: 1;
    }

    &_right {
      flex: 1 0 100%;
      max-width: 360px;
    }
  }

  &__datetime {
    color: #1d1b2099;
    opacity: 0.6;
  }

  &__title {
    margin: 12px 0 24px;
  }

  @media (max-width: 820px) {
    &__container {
      align-items: center;
      flex-direction: column;

      &_right {
        width: 100%;
        max-width: 480px;
      }
    }

    &__title {
      margin-bottom: 14px;
    }
  }
}
</style>
