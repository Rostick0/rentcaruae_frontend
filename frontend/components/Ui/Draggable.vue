<template>
  <div @mousedown="mouseDownHandler($event)">
    <div>
      <slot name="willselect" :mouseInfo="mouseInfo" />
    </div>
    <Teleport to="body">
      <div
        class="body"
        :style="`top:${mouseInfo?.mousePosition?.y}px;left:${mouseInfo?.mousePosition?.x}px;`"
        v-if="mouseInfo?.mouseDown"
      >
        <slot name="selected" :mouseInfo="mouseInfo" />
      </div>
    </Teleport>
  </div>
</template>
<script setup>
const mouseInfo = ref({});

const mouseDownHandler = (e) => {
  mouseInfo.value.mouseDownWidth = mouseInfo.value.width;

  mouseInfo.value.mouseDown = true;

  document.body.style.userSelect = "none";

  mouseInfo.value.mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };

  function mouseMoveEventListener(e) {
    mouseInfo.value.mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  window.addEventListener("mousemove", mouseMoveEventListener);

  const mouseUpEventListener = (e) => {
    mouseInfo.value.mouseDown = false;
    document.body.style.userSelect = "";

    window.removeEventListener("mouseup", mouseUpEventListener, true);
    window.removeEventListener("mousemove", mouseMoveEventListener);
  };
  window.addEventListener("mouseup", mouseUpEventListener, true);
};
</script>

<style lang="scss" scoped>
.body {
  user-select: none;
  pointer-events: none;
  position: fixed;
  z-index: 1;
}
</style>
