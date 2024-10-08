<template>
  <div class="post">
    <div class="post__image">
      <div class="post__image_inner">
        <amp-img
          class="post__img"
          :src="post?.image?.image?.path_webp + '?w=500'"
          :alt="post?.title"
          width="395"
          height="195"
          layout="fill"
        />
      </div>
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
        <AmpCarCardItem :car="post?.car" />
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
    overflow: hidden;
    max-height: 520px;

    &_inner {
      padding-top: 50%;
      position: relative;
    }
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
    }
  }

  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 24px;

    &_right {
      width: 100%;
      max-width: 480px;
    }
  }

  &__datetime {
    color: #1d1b2099;
    opacity: 0.6;
  }

  &__title {
    margin: 12px 0 14px;
  }
}
</style>
