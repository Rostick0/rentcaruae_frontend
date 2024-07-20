<template>
  <div class="car__info">
    <div class="car__info_left">
      <div class="car__options">
        <div class="car__option" v-for="option in car?.options" :key="option">
          {{ option }}
        </div>
      </div>
      <div class="car__characteristics">
        <div class="car-characteristic">
          <LazyNuxtImg
            class="car-characteristic__iconc"
            :src="`images/icon/${car?.gearbox}.svg`"
            loading="lazy"
            alt="gearbox"
            width="20"
            height="20"
          />
          <span class="car-characteristic__text">{{ car?.gearbox }}</span>
        </div>
        <div class="car-characteristic">
          <LazyNuxtImg
            class="car-characteristic__icon"
            src="images/icon/persons.svg"
            loading="lazy"
            alt="persons"
            width="20"
            height="20"
          />
          <span class="car-characteristic__text"
            >{{ car?.persons }} Person</span
          >
        </div>
        <div class="car-characteristic">
          <LazyNuxtImg
            class="car-characteristic__icon"
            :src="`images/icon/${car?.fuel_type}.svg`"
            loading="lazy"
            alt="fuel type"
            width="20"
            height="20"
          />
          <span class="car-characteristic__text">{{ car?.fuel_type }}</span>
        </div>
      </div>
    </div>
    <div class="car__info_right">
      <LazyNuxtImg
        :src="car?.user?.path"
        loading="lazy"
        :alt="car?.user?.name"
        width="78"
        height="39"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>

<style lang="scss" scoped>
.car {
  &__options {
    display: flex;
    grid-gap: 8px;
    margin-bottom: 8px;
  }

  &__option {
    color: var(--color-white);
    border-radius: 30px;
    font-weight: 700;
    padding: 4px 12px;

    &:first-child {
      background-color: #10c44d;
    }

    &:nth-child(2) {
      background-color: #26bce4;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    margin-bottom: 16px;

    &__right {
      flex-shrink: 0;
    }
  }

  &__characteristics {
    display: flex;
    grid-gap: 12px;
  }

  &-characteristic {
    display: flex;
    align-items: center;
    column-gap: 4px;

    &__icon {
      flex-shrink: 0;
    }

    &__text {
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
