<template>
  <div
    v-if="isOpen || isOpenAlways"
    class="modal"
    @click.self="close"
    :class="props.position"
    z-index="1"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import useModal from "~/composables/useModal";
const props = defineProps({
  name: String,
  style: [String, Object, Array, String],
  position: { type: String, default: "center" },
  customClass: { type: String, default: null },
  isOpenAlways: Boolean,
});
const { isOpen, close } = useModal({ name: props.name });

watch(
  () => isOpen.value,
  () => {
    try {
      if (process.client) {
        if (isOpen.value) {
          document.body.style = "overflow:hidden;";
        } else {
          document.body.style = "";
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 4px 20px 0 #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  position: absolute;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
