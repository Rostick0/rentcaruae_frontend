<template>
  <div class="wrapper">
    <LayoutAdminAside />
    <div class="wrapper__content">
      <LayoutAdminHeader />
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  flex-direction: row;

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}

.main {
  flex-grow: 1;
  padding: 25px 40px;
  overflow: auto;
}
</style>
