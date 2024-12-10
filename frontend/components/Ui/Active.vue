<template>
  <div class="active text-small">
    <span>{{ $t("Active") }}</span>
  </div>
</template>

<style lang="scss" scoped>
.active {
  background: #ecfdf3;
  color: #037847;
  border-radius: 16px;
  display: flex;
  align-items: center;
  column-gap: 6px;
  padding: 2px 6px;
  width: fit-content;

  &::before {
    background-color: #14ba6d;
    border-radius: 50%;
    content: "";
    flex-shrink: 0;
    width: 6px;
    height: 6px;
  }
}
</style>
