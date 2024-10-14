<template>
  <div v-if="isAmp">
    <div
      class="spoiler spoiler-amp"
      itemscope
      itemprop="mainEntity"
      itemtype="https://schema.org/Question"
    >
      <amp-accordion animate expand-single-section>
        <section>
          <div class="spoiler-button">
            <div class="spoiler__switch">
              <svg
                class="spoiler__icon"
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
              <div class="spoiler__title" itemprop="name">
                <slot name="title" />
              </div>
            </div>
          </div>

          <div
            class="spoiler__content"
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <div class="spoiler-body" itemprop="text">
              <slot name="content" />
            </div>
          </div>
        </section>
      </amp-accordion>
    </div>
  </div>
  <div
    v-else
    class="spoiler"
    itemscope
    itemprop="mainEntity"
    itemtype="https://schema.org/Question"
  >
    <div class="spoiler__switch" :class="{ active }" @click="active = !active">
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
      <div class="spoiler__title" itemprop="name">
        <slot name="title" />
      </div>
    </div>
    <div
      class="spoiler__content"
      :class="{ active }"
      itemscope
      itemprop="acceptedAnswer"
      itemtype="https://schema.org/Answer"
    >
      <div itemprop="text">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
const active = ref(false);

const route = useRoute();
const isAmp = computed(() => route.fullPath.startsWith("/amp"));
</script>

<style lang="scss" scoped>
.spoiler {
  &-button {
    background-color: transparent;
    border: none;
    padding: 0;
  }

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
    display: none;
    font-size: 12px;
    line-height: 1.4;
    padding-left: 20px;
    margin-top: 8px;

    &.active {
      display: block;
    }
  }
}
</style>
