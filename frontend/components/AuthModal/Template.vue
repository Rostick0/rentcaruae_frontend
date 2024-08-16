<template>
  <div class="auth-modal">
    <div class="auth-modal__top">
      <div class="auth-modal__title h1">
        <span>{{ title }}</span>
        <svg
          @click="close"
          class="auth-modal__close"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8334 5.34169L14.6584 4.16669L10.0001 8.82502L5.34175 4.16669L4.16675 5.34169L8.82508 10L4.16675 14.6584L5.34175 15.8334L10.0001 11.175L14.6584 15.8334L15.8334 14.6584L11.1751 10L15.8334 5.34169Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="auth-modal__subtitle">{{ subtitle }}</div>
    </div>
    <div class="auth-modal__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
});

const { close } = useModal({
  name: "auth-modal",
});
</script>

<style lang="scss">
.auth-modal {
  width: 100%;
  max-width: 375px;

  &__top {
    background-color: var(--color-basic);
    color: var(--color-white);
    border-radius: 8px 8px 0 0;
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 228px;
  }

  &__title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: auto;
  }

  &__close {
    cursor: pointer;
    flex-shrink: 0;
  }

  &__content {
    background-color: var(--color-white);
    border-radius: 0 0 8px 8px;
    padding: 30px 20px 20px;
  }
}
</style>
