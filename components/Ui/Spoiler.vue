<template>
  <div class="spoiler">
    <div class="spoiler__switch" @click="active = !active">
      <svg
        class="spoiler__icon"
        :class="{ active }"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.825 6.91248L10 10.7291L6.175 6.91248L5 8.08748L10 13.0875L15 8.08748L13.825 6.91248Z"
          fill="#221EE3"
        />
      </svg>
      <div class="spoiler__title">
        <slot name="title" />
      </div>
    </div>
    <div class="spoiler__content" v-if="active">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
const active = ref(false);
</script>

<style lang="scss" scoped>
.spoiler {
  &__switch {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  &__icon {
    flex-shrink: 0;
    transition: 0.3s;

    &.active {
      transform: rotate(180deg);
    }
  }

  &__title {
    display: flex;
    column-gap: 4px;
    font-size: 14px;
  }

  &__content {
    font-size: 12px;
    padding-left: 20px;
    margin-top: 8px;
  }
}
</style>
