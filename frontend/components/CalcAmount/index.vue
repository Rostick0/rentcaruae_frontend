<template>
  <div class="calc-amount">
    <div class="calc-amount__flex">
      <div class="calc-amount__flex_left">
        <!-- <span>Rental</span>
        <span>{{ periodRental }} {{ periodText }}</span> -->
        {{ textTopleft }}
      </div>
      <strong class="calc-amount__size-small"
        >AED {{ formatNumber(price) }}</strong
      >
    </div>
    <div class="calc-amount__flex">
      <div class="calc-amount__flex_left">
        <span>VAT</span>
        <span>Tax (5%)</span>
      </div>
      <strong class="calc-amount__size-small"
        >+ AED {{ formatNumber(tax) }}</strong
      >
    </div>
    <div class="calc-amount__hr"></div>
    <div class="calc-amount__flex">
      <div class="calc__title">Total</div>
      <strong class="calc-amount__price">
        AED
        <span class="calc-amount__price_val">{{
          formatNumber(price + tax)
        }}</span>
      </strong>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  textTopleft: String,
  price: [String, Number],
});

const tax = computed(() => props.price * 0.05);
</script>

<style lang="scss" scoped>
.calc-amount {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__hr {
    background-color: #f5f5f5;
    width: 100%;
    height: 1px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
  }

  &__price {
    color: var(--color-basic);
    font-size: 20px;

    &_val {
      font-size: 28px;
    }
  }
}
</style>
