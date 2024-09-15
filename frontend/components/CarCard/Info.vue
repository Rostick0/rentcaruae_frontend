<template>
  <div class="car__info">
    <div class="car__info_left">
      <div class="car__options">
        <!-- <div class="car__option" v-for="option in car?.options" :key="option">
          {{ option }}
        </div> -->
        <div class="car__option" v-if="car?.is_new">NEW</div>
        <div class="car__option" v-if="car?.price_special?.length">
          Special offer
        </div>
      </div>
      <div class="car__characteristics">
        <div class="car-characteristic" :title="car?.transmission?.name">
          <LazyNuxtImg
            class="car-characteristic__iconc"
            :src="`images-frontend/icon/auto.svg`"
            alt="fuel type"
            loading="lazy"
            width="20"
            height="20"
          />
          <span class="car-characteristic__text">{{
            car?.transmission?.name?.substr(0, 4)
          }}</span>
        </div>
        <div class="car-characteristic">
          <LazyNuxtImg
            class="car-characteristic__icon"
            src="images-frontend/icon/persons.svg"
            alt="persons"
            loading="lazy"
            width="20"
            height="20"
          />
          <span class="car-characteristic__text">{{ car?.seats }} Person</span>
        </div>
        <div class="car-characteristic">
          <LazyNuxtImg
            class="car-characteristic__icon"
            :src="`images-frontend/icon/${
              car?.fuel_type?.name === 'Electro' ? 'electric' : 'petrol'
            }.svg`"
            alt="fuel type"
            loading="lazy"
            width="20"
            height="20"
          />
          <span class="car-characteristic__text">{{
            car?.fuel_type?.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="car__info_right">
      <!-- <NuxtLink class="d-flex" :to="`/company/${car?.user?.company?.id}`">
        <LazyNuxtImg
          class="car__info_img"
          :src="car?.user?.company?.image?.image?.path_webp + '?w=150'"
          :alt="car?.user?.company?.name"
          decoding="async"
          loading="lazy"
          width="78"
          height="39"
        />
      </NuxtLink> -->
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
    padding: 4px 12px 3px;

    &:first-child {
      background-color: var(--color-light-green);
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
    margin-bottom: 18px;

    &_right {
      display: flex;
      flex-shrink: 0;
    }

    &_img {
      object-fit: contain;
    }
  }

  &__characteristics {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 13px;
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
