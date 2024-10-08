<template>
  <div class="seller-header">
    <div class="seller-header__balance">
      AED
      <span class="seller-header__balance_sum">{{
        formatNumber(user?.balance)
      }}</span>
    </div>
    <NuxtLink class="d-flex" to="/seller/deposite/">
      <UiButton class="seller-header__btn">Deposite</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const user = useState("user");
</script>

<style lang="scss" scoped>
.seller-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 28px;
  padding: 8px 40px;

  &__balance {
    font-weight: 700;

    &_sum {
      font-size: 20px;
    }
  }

  &__btn {
    padding: 10px 16px;
  }
}
</style>
