<template>
  <SellerFormBlock class="verification" title="Verification status">
    <div class="verification__list">
      <UiStatus :isAccept="!!user?.company?.license"
        >Add Trade license</UiStatus
      >
      <UiStatus :isAccept="!!user?.company?.sertificate"
        >Add Vat sertificate</UiStatus
      >
      <UiStatus :isAccept="!!user?.is_verified">Verified</UiStatus>
    </div>
    <UiButton>Resend</UiButton>
  </SellerFormBlock>
</template>

<script setup>
const user = useState("user");
</script>

<style lang="scss" scoped>
.verification {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
