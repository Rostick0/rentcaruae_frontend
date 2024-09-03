<template>
  <div class="refresh-used">
    <div class="refresh-used__top">
      <span>Refresh Used</span>
      <div class="refresh-used__counter">
        {{ user?.refresh_car?.count + "/" + user?.refresh_car?.max }}
      </div>
    </div>
    <UiProgressLine
      :progress="
        Math.round((user?.refresh_car?.count / user?.refresh_car?.max) * 100)
      "
    />
  </div>
</template>

<script setup>
const user = useState("user");
</script>

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
