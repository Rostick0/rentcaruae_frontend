<template>
  <AnyFormBlock class="verification" title="Verification status">
    <div class="verification__list">
      <UiStatus :isAccept="!!user?.company?.is_trade_license"
        >Add Trade license</UiStatus
      >
      <UiStatus :isAccept="!!user?.company?.is_vat_sertificate"
        >Add Vat sertificate</UiStatus
      >
      <UiStatus :isAccept="!!user?.is_verified">Verified</UiStatus>
    </div>
    <UiButton class="verification__btn">Resend</UiButton>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});
</script>

<style lang="scss" scoped>
.verification {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__btn {
    margin-left: auto;
    width: fit-content;
  }
}
</style>
