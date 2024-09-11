<template>
  <div class="calc-amount">
    <slot name="calc-stats" />
    <div class="calc-amount__flex">
      <div class="calc-amount__flex_left">
        {{ textTopleft }}
      </div>
      <strong class="calc-amount__size-small"
        >AED {{ formatNumber(price) }}</strong
      >
    </div>
    <div class="calc-amount__flex">
      <div class="calc-amount__flex_left">
        <span>VAT&nbsp;</span>
        <span>Tax (5%)</span>
      </div>
      <strong class="calc-amount__size-small">tax is included</strong>
    </div>
    <div class="calc-amount__hr"></div>
    <slot name="summary" />
  </div>
</template>

<script setup>
const props = defineProps({
  textTopleft: String,
  price: [String, Number],
  tax: [String, Number],
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/calc-amount";
</style>
