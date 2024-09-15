<template>
  <div class="car">
    <div class="car__left">
      <LazyCarImages :images="car?.images" :car="car" />
      <CarInfo
        v-if="$device.isDesktopOrTablet"
        :car="car"
        :specifications="specifications"
        :isLeasing="isLeasing"
      />
      <!-- <CarCardInfo :car="car" />
        <CarSpecifications
          v-if="specifications"
          :specifications="specifications"
        />
        <CarDescription v-if="car?.description" :car="car" />
        <CarRentalPricing :car="car" :isLeasing="isLeasing" /> -->
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
      <LazyNuxtLazyHydrate whenVisible>
        <LazyCarCalcLeasing v-if="isLeasing" :car="car" @submited="open()">
          <template v-if="$device.isMobile" #car-info>
            <CarInfo
              :car="car"
              :specifications="specifications"
              :isLeasing="isLeasing"
            />
          </template>
        </LazyCarCalcLeasing>
        <LazyCarCalc v-else :car="car" @submited="open()">
          <template v-if="$device.isMobile" #car-info>
            <CarInfo
              :car="car"
              :specifications="specifications"
              :isLeasing="isLeasing"
            />
          </template>
        </LazyCarCalc>
      </LazyNuxtLazyHydrate>
    </div>
  </div>
  <LazyUiModalToast title="Thank you for booking" :name="name">
    <p>A company representative will contact you within 1 hour</p>
  </LazyUiModalToast>
</template>

<script setup>
const props = defineProps({
  car: Object,
  isLeasing: Boolean,
});

const name = "thanksForBooking";
const { open, close } = useModal({
  name,
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

  @media (max-width: 1024px) {
    flex-wrap: wrap;

    &__right {
      flex: 1 0 100%;
    }
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
