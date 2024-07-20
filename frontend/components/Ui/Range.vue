<template>
  <div class="range">
    <div class="range__top"></div>
    <div class="range-input">
      <div class="range-input__left"></div>
      <div
        class="range-input__line"
        ref="line"
        @mousedown="mouseDownHandler"
      ></div>
      <div class="range-input__right"></div>
      <!-- <input class="range-input" type="range" /> -->
    </div>
    <div class="range__bottom"></div>
  </div>
</template>

<script setup>
const value = ref(0);
const line = ref(null);

const mouseDownHandler = (e) => {
  line.value.mouseDownWidth = line.value.width;
  line.value.mouseDown = true;
  document.body.style.userSelect = "none";
  line.value.mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
  function mouseMoveEventListener(e) {
    line.value.mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  }
  window.addEventListener("mousemove", mouseMoveEventListener);
  const mouseUpEventListener = (e) => {
    line.value.mouseDown = false;
    document.body.style.userSelect = "";
    window.removeEventListener("mouseup", mouseUpEventListener, true);
    window.removeEventListener("mousemove", mouseMoveEventListener);
  };
  window.addEventListener("mouseup", mouseUpEventListener, true);
};
</script>

<style lang="scss" scoped>
.range {
  &-input {
    display: flex;
    align-items: center;
    position: relative;
    column-gap: 4px;
    height: 44px;

    &__left {
      background-color: var(--color-basic);
      border-radius: 16px 2px 2px 16px;
      width: 100%;
      height: 16px;
    }

    &__line {
      background-color: var(--color-basic);
      border-radius: 2px;
      cursor: pointer;
      position: absolute;
      flex-shrink: 0;
      width: 2px;
      height: 44px;
    }

    &__right {
      background-color: #26bce433;
      border-radius: 2px 16px 16px 2px;
      width: 100%;
      height: 16px;
    }
  }
}
</style>
