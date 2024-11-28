<template>
  <div class="specifications" v-if="specifications?.length">
    <h2 class="specifications__title">Specifications</h2>
    <div class="specifications__inner">
      <div class="specification">
        <div class="specification__title">Brand</div>
        <NuxtLink
          class="specification__item"
          :to="
            convertNameToUrl(
              `/${currentCity?.name ?? 'all'}/brand/${
                car?.generation?.model_car?.brand?.name
              }/`
            )
          "
        >
          {{ car?.generation?.model_car?.brand?.name }}
        </NuxtLink>
      </div>
      <div class="specification">
        <div class="specification__title">Body</div>
        <NuxtLink
          class="specification__item"
          :to="
            convertNameToUrl(
              `/${currentCity?.name ?? 'all'}/body/${car?.generation?.name}/`
            )
          "
          >{{ car?.generation?.name }}</NuxtLink
        >
      </div>
      <div
        class="specification direction-column"
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
  car: Object,
  specifications: Array,
});

const currentCity = useState("currentCity");
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
    flex-wrap: wrap;
    grid-gap: 12px 40px;
  }
}

.specification {
  display: flex;
  // flex-direction: column;
  grid-gap: 8px;

  &:nth-child(-n + 2) {
    flex-basis: 100%;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    // margin-bottom: 8px;

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
