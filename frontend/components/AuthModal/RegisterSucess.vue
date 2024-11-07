<template>
  <AuthModalTemplate
    class="auth-modal__success"
    title="Become a partnership"
    subtitle="For Rent a car companies"
  >
    <div class="auth-modal__success_text text-ui">
      <span>Thanks!</span>
      <span>We will contact you as soon as possible</span>
    </div>
    <UiButton class="auth-modal__btn" @click="close" variant="outlined">Close</UiButton>
  </AuthModalTemplate>
</template>

<script setup>
const { close } = useModal({
  name: "auth-modal",
});
</script>

<style lang="scss" scoped>
@forward "./../../assets/scss/components/auth-modal";

.auth-modal__success {
  &_text {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    row-gap: 28px;
    margin-bottom: 40px;
  }
}
</style>
