<template>
  <div class="title-list">
    <h2 class="title-list__title">{{ title }}</h2>
    <LinkMore :name="linkText" :to="link" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  linkText: String,
  link: String,
});
</script>

<style lang="scss" scoped>
.title-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  min-height: 44px;
}
</style>
