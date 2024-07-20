<template>
  <div class="wrapper">
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
}
</style>
