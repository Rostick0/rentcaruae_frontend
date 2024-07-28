<template>
  <div class="admin-header">
    <div class="admin-header__balance">AED <span class="admin-header__balance_sum">{{ balance.toLocaleString() }}</span></div>
    <NuxtLink class="d-flex" to="/">
      <UiButton class="admin-header__btn">Deposite</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const user = useState("user");

const balance = 3499;
</script>

<style lang="scss" scoped>
.admin-header {
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
