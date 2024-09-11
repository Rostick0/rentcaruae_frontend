<template>
  <div class="calc__top">
      <div class="calc__top_left">
        <div class="calc__top_title calc__title">
          {{ periodSelect.modelValue?.name }} rental offer
        </div>
        <div class="calc__top_period">
          <span>Selected period:</span>
          <div>
            <VFormComponent :field="periodSelect" />
          </div>
        </div>
      </div>
      <div class="calc__top_right">
        <div class="calc__price-old">
          {{ periodSelect.modelValue?.name }}
          <del class="color-red" v-if="priceSpecial">AED {{ priceSpecial }}</del>
        </div>
        <div class="calc__price">
          AED
          <span class="calc__price_val">{{ price }}</span>
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
    priceSpecial: Number,
    price: Number,
})

const periodSelect = ref({
  type: "select",
  name: "period",
  modelValue: periodOptions[0],

  bind: {
    options: periodOptions,
    isAlternative: true,
  },
});
</script>

<style>

</style>