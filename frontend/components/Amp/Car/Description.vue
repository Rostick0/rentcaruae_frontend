<template>
  <div class="description">
    <h2 class="description__title">{{ car?.title }} {{ car?.year }}</h2>
    <UiContentOverflow heightDefault="128">
      <div
        class="description__content"
        :class="{ active }"
        ref="content"
        v-html="car?.description"
      />
    </UiContentOverflow>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
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
  }
}
</style>
