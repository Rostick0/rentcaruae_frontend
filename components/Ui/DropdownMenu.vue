<template>
  <div class="dropdown" tabindex="-1" @focusout="onFocusout" ref="wrapper">
    <div @click="toggle" class="dropdown-menu-button">
      <slot name="body" />
    </div>
    <div
      class="dropdown-menu"
      v-if="wrapper && isOpened"
      ref="dropdownMenu"
      tabindex="-1"
    >
      <slot name="drop" />
    </div>
  </div>
</template>
<script setup>
const isOpened = ref(false);

const wrapper = ref();

const onFocusout = (e) => {
  if (!wrapper?.value?.contains(e?.relatedTarget)) isOpened.value = false;
};

const toggle = () => {
  isOpened.value = !isOpened.value;

  if (!isOpened.value) return;

  nextTick(() => {
    const dropdownMenu = wrapper.value?.querySelector(".dropdown-menu");
    const elementRect = dropdownMenu.getBoundingClientRect();

    if (elementRect.right > window.innerWidth) {
      dropdownMenu.style.left =
        window.innerWidth - 20 - elementRect?.width + "px";
    } else {
      dropdownMenu.style.left =
        wrapper.value?.getBoundingClientRect()?.left + "px";
    }

    if (elementRect.bottom > window.innerHeight) {
      dropdownMenu.style.top =
        window.innerHeight -
        20 -
        // wrapper.value?.getBoundingClientRect()?.top +
        // wrapper.value?.clientHeight -
        elementRect?.height +
        "px";
    } else {
      dropdownMenu.style.top =
        wrapper.value?.getBoundingClientRect()?.top +
        wrapper.value?.clientHeight +
        "px";
    }
  });
};
</script>

<style lang="scss">
.dropdown {
  &-menu {
    position: fixed;
    z-index: 102;
    width: 200px;

    &-button {
    }
  }
}
</style>
