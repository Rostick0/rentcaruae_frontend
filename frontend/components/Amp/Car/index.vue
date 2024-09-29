<template>
  <div class="car">
    <div class="car__left">
      <AmpCarImages :images="car?.images" :car="car" />
    </div>
    <div class="car__right">
      <AmpCarCalcLeasing v-if="isLeasing" :car="car">
        <template #car-info>
          <AmpCarInfo
            :car="car"
            :specifications="specifications"
            :isLeasing="isLeasing"
          />
        </template>
      </AmpCarCalcLeasing>
      <AmpCarCalc v-else :car="car">
        <template #car-info>
          <AmpCarInfo
            :car="car"
            :specifications="specifications"
            :isLeasing="isLeasing"
          />
        </template>
      </AmpCarCalc>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
  isLeasing: Boolean,
});

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
  flex-direction: column;
  column-gap: 20px;
  margin-bottom: 20px;

  &__spoilers {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
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
