<template>
  <div class="status">
    <div class="status__icon">
      <svg
        v-if="isAccept"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.99984 1.6665C5.39984 1.6665 1.6665 5.39984 1.6665 9.99984C1.6665 14.5998 5.39984 18.3332 9.99984 18.3332C14.5998 18.3332 18.3332 14.5998 18.3332 9.99984C18.3332 5.39984 14.5998 1.6665 9.99984 1.6665ZM9.1665 14.1665V12.4998H10.8332V14.1665H9.1665ZM9.1665 5.83317V10.8332H10.8332V5.83317H9.1665Z"
          fill="#B3261E"
        />
      </svg>
      <svg
        v-else
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.99984 1.6665C5.39984 1.6665 1.6665 5.39984 1.6665 9.99984C1.6665 14.5998 5.39984 18.3332 9.99984 18.3332C14.5998 18.3332 18.3332 14.5998 18.3332 9.99984C18.3332 5.39984 14.5998 1.6665 9.99984 1.6665ZM9.1665 14.1665V12.4998H10.8332V14.1665H9.1665ZM9.1665 5.83317V10.8332H10.8332V5.83317H9.1665Z"
          fill="#B3261E"
        />
      </svg>
    </div>
    <div class="status__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isAccept: Boolean,
});
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  column-gap: 32px;

  &__icon {
    display: flex;
    flex-shrink: 0;
  }
}
</style>
