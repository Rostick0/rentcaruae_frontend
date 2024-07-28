<template>
  <div class="refresh-used">
    <div class="refresh-used__top">
      <span>Refresh Used</span>
      <div class="refresh-used__counter">20/35</div>
    </div>
    <UiProgressLine :progress="(20 / 35) * 100" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.refresh-used {
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__counter {
    background-color: var(--color-basic);
    border-radius: 8px;
    padding: 4px 12px;
  }
}
</style>
