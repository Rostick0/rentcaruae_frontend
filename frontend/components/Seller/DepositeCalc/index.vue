<template>
  <AnyFormBlock class="deposite-calc" title="Choose option">
    <SellerDepositeCalcSelect :deposites="data" v-model="price" />
    <div class="deposite-calc__bottom">
      <CalcAmount :price="price" textTopleft="Package Advanced" />
      <UiButton>Deposit</UiButton>
    </div>
  </AnyFormBlock>
</template>

<script setup>
const { data, get } = await useApi({
  name: "deposites.getAll",
  params: {
    extends: "deposite_leads",
  },
});

await get();

const price = ref(data.value?.[0]?.price);
</script>

<style lang="scss" scoped>
.deposite-calc {
  max-width: 716px;

  &__bottom {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-left: auto;
    width: 100%;
    max-width: 432px;
  }
}
</style>

<style lang="scss">
.deposite-calc {
  .form-block__content {
    row-gap: 40px;
  }
}
</style>
