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
      <strong class="calc-amount__size-small" v-if="taxIsNumber"
        >+ AED {{ formatNumber(tax) }}</strong
      >
      <strong class="calc-amount__size-small" v-else>{{ tax }}</strong>
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
  taxIsNumber: {
    type: Boolean,
    default: true,
  },
});

// const tax = computed(() => props.total * 0.05);
</script>

<style lang="scss" scoped>
@forward "./../../assets/scss/components/calc-amount";
</style>
