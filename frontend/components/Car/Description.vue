<template>
  <div class="description">
    <h2 class="description__title">{{ title }}</h2>
    <div
      class="description__content"
      :class="{ active }"
      ref="content"
      v-html="description"
    />
    <UiButton
      class="description__btn"
      v-if="isShow"
      @click="active = !active"
      variant="outlined"
      >{{ active ? "Hide" : "Show more" }}</UiButton
    >
  </div>
</template>

<script setup>
const props = defineProps({
  title: [String, null],
  description: [String, null],
});

const isShow = ref();
const active = ref(false);
const content = ref();

onMounted(() => {
  if (content.value?.scrollHeight !== content.value?.clientHeight)
    isShow.value = true;
});
</script>

<style lang="scss" scoped>
.description {
  &__title {
    margin-bottom: 12px;
  }

  &__content {
    font-size: 14px;
    white-space: pre-wrap;
    overflow: hidden;
    margin-bottom: 20px;
    max-height: 128px;

    &.active {
      max-height: initial;
    }
  }

  .description__btn {
    border-color: transparent;
    display: block;
    margin-top: -20px;
    margin-left: auto;
    width: fit-content;
  }
}
</style>
