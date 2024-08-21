<template>
  <div class="car">
    <div class="car__left">
      <LazyCarImages :images="car?.images" :carTitle="car?.title" />
      <CarCardInfo :car="car" />
      <CarSpecifications
        v-if="specifications"
        :specifications="specifications"
      />
      <CarDescription :title="car?.title" :description="car?.description" />
      <CarRentalPricing :car="car" :isLeasing="isLeasing" />
      <!-- <div class="car__spoilers">
        <UiSpoiler>
          <template #title>DOCUMENTS REQUIRED</template>
        </UiSpoiler>
        <UiSpoiler>
          <template #title>Frequently Asked Questions</template>
        </UiSpoiler>
      </div> -->
    </div>
    <div class="car__right">
      <LazyCarCalcLeasing v-if="isLeasing" :car="car" />
      <LazyCarCalc v-else :car="car" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const route = useRoute();

const isLeasing = computed(() => route.fullPath.split("/")[2] === "leasing");

const specifications = computed(() =>
  groupByInArray(
    props.car?.car_options?.map?.((item) => item?.option),
    "type"
  )
);
</script>

<style lang="scss" scoped>
.car {
  display: flex;
  align-items: flex-start;
  column-gap: 20px;
  margin-bottom: 20px;

  &__spoilers {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__left {
    flex-grow: 1;
    flex-shrink: 1;
  }

  &__right {
    flex: 0 0 456px;
    position: sticky;
    top: 16px;
  }
}
</style>

<style lang="scss">
.car {
  .spoiler {
    &__switch {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    &__title {
      font-size: 24px;
      font-weight: 700;
    }

    &__icon {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
