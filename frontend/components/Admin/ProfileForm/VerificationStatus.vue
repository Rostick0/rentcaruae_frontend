<template>
  <AdminFormBlock class="verification" title="Verification status">
    <div class="verification__list">
      <UiStatus>Add Trade license</UiStatus>
      <UiStatus>Add Vat sertificate</UiStatus>
      <UiStatus>Verified</UiStatus>
    </div>
    <UiButton>Resend</UiButton>
  </AdminFormBlock>
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
}
</style>
