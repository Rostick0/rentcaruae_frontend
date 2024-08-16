<template>
  <UiModal :name="modalName">
    <LazyAuthModalLogin v-if="authModalState === 'login'" @closeModal="close" />
    <LazyAuthModalRegister
      v-else-if="authModalState === 'register'"
      @closeModal="close"
    />
    <LazyAuthModalRegisterSucess
      v-else-if="authModalState === 'register_success'"
    />
  </UiModal>
</template>

<script lang="ts" setup>
const modalName = "auth-modal";
const { open, close } = useModal({
  name: modalName,
});

const authModalState = useState<"login" | "register" | "register_success">(
  "authModalState",
  () => "login"
);
</script>

<style lang="scss" scoped></style>
