<template>
  <div class="wrapper">
    <LayoutSellerAside />
    <div class="wrapper__content">
      <LayoutSellerHeader />
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  flex-direction: row;
  max-height: 100vh;

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
