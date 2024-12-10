<template>
  <div class="content-overflow">
    <div
      class="content-overflow__slot"
      :style="{ maxHeight: active ? '10000px' : heightDefault + 'px' }"
      ref="content"
    >
      <slot />
    </div>

    <UiButton
      class="content-overflow__btn"
      v-if="!$route.path?.startsWith('/amp')"
      @click.prevent="active = !active"
      variant="outlined"
      >{{ active ? $t("") : $t("showMore") }}</UiButton
    >
  </div>
</template>

<script setup>
const props = defineProps({
  heightDefault: [Number, String],
});

const route = useRoute();

const isShow = ref();
const active = ref(route.path?.startsWith("/amp"));
const content = ref();

onMounted(() => {
  if (content.value?.scrollHeight !== content.value?.clientHeight)
    isShow.value = true;
});
</script>

<style lang="scss" scoped>
.content-overflow {
  &__slot {
    overflow: hidden;
    transition: 0.3s cubic-bezier(1, 0, 0, 1);
  }

  &__btn {
    border-color: transparent;
    display: block;
    margin-left: auto;
    width: fit-content;

    &:hover {
      border-color: transparent;
    }
  }
}
</style>
