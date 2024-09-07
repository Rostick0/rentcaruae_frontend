<template>
  <AnyFormBlock class="deposite-calc" title="Choose option">
    <SellerDepositeCalcSelect :deposites="data" v-model="price" />
    <div class="deposite-calc__bottom">
      <CalcAmount :price="price" textTopleft="Package Advanced" />
      <UiButton @click="sendDeposte">Deposit</UiButton>
    </div>
  </AnyFormBlock>
</template>

<script setup>
import api from "~/api";

const { data, get } = await useApi({
  name: "deposites.getAll",
  params: {
    extends: "deposite_leads",
  },
});

await get();

const price = ref(data.value?.[0]?.price);

const sendDeposte = async () => {
  const payment = data.value?.find?.((item) => item?.price === price.value);

  const res = await api.deposite.create({
    data: {
      type: "deposites",
      payment_id: payment?.payment_id,
    },
  });

  if (res?.error) {
    warningPopup("Error");
    return;
  }

  window.open(res?.data?.link);
  // window.open('https://example.com', '_blank');
};
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
