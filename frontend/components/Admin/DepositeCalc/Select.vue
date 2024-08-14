<template>
  <div class="deposite-select">
    <div
      class="deposite-select-item"
      v-for="deposite in depositesComputed"
      :key="deposite.id"
    >
      <div class="deposite-select-item__top">
        <div class="deposite-select-item__price">
          AED {{ formatNumber(deposite?.price) }}
        </div>
        <strong class="deposite-select-item__leads text-small"
          >Get {{ deposite?.free_leads }} FREE leads</strong
        >
      </div>
      <div class="deposite-select-item__hr"></div>
      <div
        class="deposite-select-item-prices text-small"
        v-for="depositeLead in deposite?.deposite_leads"
        :key="depositeLead?.group"
      >
        <strong class="deposite-select-item-price__title">
          {{ depositeLead?.group }} cars
        </strong>
        <template v-for="priceItem in depositeLead?.value">
          <div class="deposite-select-item-price__lead">
            <span class="deposite-select-item-price__lead_left"
              >{{ priceItem?.type }} lead</span
            >
            <span class="deposite-select-item-price__lead_right"
              >AED {{ priceItem?.price }}</span
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  deposites: Array,
});

const depositesComputed = computed(() =>
  props.deposites?.map?.((item) => ({
    ...item,
    deposite_leads: groupByInArray(item?.deposite_leads, "car_type"),
  }))
);
</script>

<style lang="scss" scoped>
.deposite-select {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  &-item {
    border: 1px solid var(--color-text20);
    border-radius: 8px;
    padding: 24px 10px 40px;

    &__top {
      text-align: center;
      margin-bottom: 10px;
    }

    &__price {
      font-size: 24px;
    }

    &__hr {
      background-color: var(--color-basic);
      margin: 0 auto 15px;
      width: calc(100% - 20px);
      height: 1px;
    }

    &-prices {
      display: flex;
      flex-direction: column;
      row-gap: 6px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-price {
      &__title {
        &::first-letter {
          text-transform: uppercase;
        }
      }

      &__lead {
        display: flex;
        justify-content: space-between;

        &_left {
          &::first-letter {
            text-transform: uppercase;
          }
        }

        &_right {
          text-align: right;
        }
      }
    }
  }
}
</style>
