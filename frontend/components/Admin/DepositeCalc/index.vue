<template>
  <AdminFormBlock class="deposite-calc" title="Choose option">
    <AdminDepositeCalcSelect :deposites="data" />
    <div class="deposite-calc__bottom">
      <CalcAmount :price="price" textTopleft="Package Advanced" />
      <UiButton>Deposit</UiButton>
    </div>
  </AdminFormBlock>
</template>

<script setup>
const price = ref(300);

const { data } = await useApi({
  name: "deposites.getAll",
  params: {
    extends: "deposite_leads",
  },
  init: true,
});
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
