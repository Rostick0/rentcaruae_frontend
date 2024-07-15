<template>
  <div class="specifications">
    <h2 class="specifications__title">Specifications</h2>
    <div class="specifications__inner">
      <div
        class="specification"
        v-for="specType in specifications"
        :key="specType.group"
      >
        <div class="specification__title">{{ specType.group }}</div>
        <ul class="specification__list" v-if="specType.value?.length">
          <li
            class="specification__item"
            v-for="spec in specType.value"
            :key="spec?.name"
          >
            {{ spec?.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  specifications: Array,
});
</script>

<style lang="scss" scoped>
.specifications {
  color: #464655;
  margin-bottom: 20px;

  &__title {
    margin-bottom: 12px;
  }

  &__inner {
    display: flex;
    grid-gap: 40px;
  }
}

.specification {
  &__title {
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 8px;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }

  &__item {
    font-size: 14px;
  }
}
</style>
