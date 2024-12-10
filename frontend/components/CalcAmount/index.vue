<template>
  <div class="calc-amount">
    <slot name="calc-stats" />
    <div class="calc-amount__flex">
      <div class="calc-amount__flex_left">
        {{ textTopleft }}
      </div>
      <strong class="calc-amount__size-small"
        >{{ currentExchangeRate?.name }}
        {{ formatNumber(getConvertedPrice(price)) }}</strong
      >
    </div>
    <div class="calc-amount__flex">
      <div class="calc-amount__flex_left">
        <span>{{$t('VAT')}}&nbsp;</span>
        <span>{{ $t('Tax') }} (5%)</span>
      </div>
      <strong class="calc-amount__size-small" v-if="taxIsNumber"
        >+ {{ currentExchangeRate?.name }}
        {{ formatNumber(getConvertedPrice(tax)) }}</strong
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

const { currentExchangeRate, getConvertedPrice } = await useExchangeRate();

// const tax = computed(() => props.total * 0.05);
</script>

<style lang="scss" scoped>
@forward "./../../assets/scss/components/calc-amount";
</style>
