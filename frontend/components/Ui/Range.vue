<template>
  <div class="range">
    <div class="range__top"></div>
    <div
      class="range-input"
      ref="rangeInput"
      @click="partsCount !== 0 && clickHandler($event)"
    >
      <div
        class="range-input__left"
        :style="{
          width: `calc(${valueComputed}% - 4px)`,
        }"
      ></div>
      <div
        class="range-input__line"
        @mousedown="partsCount !== 0 && mouseDownHandler($event)"
        @touchstart="partsCount !== 0 && touchStartHandler($event)"
        :style="{
          left: line?.x + 'px',
        }"
      />
      <!-- <input class="range-input__val" type="range" /> -->
      <div
        class="range-input__right"
        :style="{
          width: 0,
        }"
      ></div>
    </div>
    <div class="range__bottom"></div>
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";

const props = defineProps({
  modelValue: {
    type: [Number, String, null],
    default: 0,
  },
  partsCount: {
    type: [String, Number],
  },
});

const emits = defineEmits(["update:modelValue"]);

const rangeInput = ref();
const width = ref();
const line = ref({
  x: 0,
});

const resizeWindow = ref();

const valueComputed = computed(() =>
  Math.round((line.value.x / width.value) * 100)
);

const getOnePartSizePx = computed(() => 100 / props?.partsCount);
const getPartsDivisor = computed(() =>
  props?.partsCount ? getOnePartSizePx.value : 1
);

watch(
  () => line.value.x,
  debounce(
    () =>
      emits(
        "update:modelValue",
        Math.round(valueComputed.value / getPartsDivisor.value)
      ),
    200
  )
);

const partPx = computed(() => Math.round(width.value / props.partsCount));

const setPosition = (clientX) => {
  const left = rangeInput.value.getBoundingClientRect().left;

  const positon = clientX - left;

  if (positon <= 0) return 0;

  if (positon - width.value > 0) return width.value;

  if (props?.partsCount)
    return Math.round(positon / partPx.value) * partPx.value;

  return positon;
};

onMounted(() => {
  resizeWindow.value = debounce(() => {
    width.value = rangeInput.value.getBoundingClientRect().width;
    line.value.x =
      width.value *
      (((props?.partsCount ? getOnePartSizePx.value : 1) * props.modelValue) /
        100);
  }, 50);

  resizeWindow.value();
  window.addEventListener("resize", resizeWindow.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeWindow.value);
});

const clickHandler = (e) => (line.value.x = setPosition(e.clientX));

const mouseDownHandler = (e) => {
  line.value.x = setPosition(e.clientX);

  function mouseMoveEventListener(e) {
    line.value.x = setPosition(e.clientX);
  }

  window.addEventListener("mousemove", mouseMoveEventListener);
  const mouseUpEventListener = (e) => {
    document.body.style.userSelect = "";
    window.removeEventListener("mouseup", mouseUpEventListener, true);

    window.removeEventListener("mousemove", mouseMoveEventListener);
  };
  window.addEventListener("mouseup", mouseUpEventListener, true);
};

const touchStartHandler = (e) => {
  line.value.x = setPosition(e.touches[0].clientX);

  const touchMoveEventListener = (e) => {
    line.value.x = setPosition(e.touches[0].clientX);
  };

  window.addEventListener("touchmove", touchMoveEventListener);

  const touchEndEventListener = (e) => {
    document.body.style.userSelect = "";
    window.removeEventListener("touchend", touchEndEventListener, true);
    window.removeEventListener("touchmove", touchMoveEventListener);
  };

  window.addEventListener("touchend", touchEndEventListener, true);
};
</script>

<style lang="scss" scoped>
// /*Range Reset*/
// input[type="range"] {
//   -webkit-appearance: none;
//   appearance: none;
//   background: transparent;
//   cursor: pointer;
//   width: 100%;
// }

// /* Removes default focus */
// input[type="range"]:focus {
//   outline: none;
// }

// /***** Chrome, Safari, Opera and Edge Chromium styles *****/
// /* slider track */
// input[type="range"]::-webkit-slider-runnable-track {
//   background-color: var(--color-basic);
//   border-radius: 16px;
//   height: 16px;
// }

// /* slider thumb */
// input[type="range"]::-webkit-slider-thumb {
//   -webkit-appearance: none; /* Override default look */
//   appearance: none;
//   margin-top: -13px; /* Centers thumb on the track */

//   /*custom styles*/
//   background-color: var(--color-basic);
//   height: 44px;
//   width: 2px;
// }

// // input[type="range"]:focus::-webkit-slider-thumb {
// //   border: 1px solid var(--color-basic);
// //   outline-offset: 0.125rem;
// // }

// /******** Firefox styles ********/
// /* slider track */
// input[type="range"]::-moz-range-track {
//   background-color: var(--color-basic);
//   border-radius: 16px;
//   height: 16px;
// }

// /* slider thumb */
// input[type="range"]::-moz-range-thumb {
//   border: none; /*Removes extra border that FF applies*/
//   border-radius: 0; /*Removes default border-radius that FF applies*/

//   /*custom styles*/
//   background-color: var(--color-basic);
//   height: 44px;
//   width: 2px;
// }

// input[type="range"]:focus::-moz-range-thumb {
//   border: 1px solid #053a5f;
//   outline: 3px solid #053a5f;
//   outline-offset: 0.125rem;
// }

.range {
  &-input {
    display: flex;
    align-items: center;
    position: relative;
    column-gap: 8px;
    height: 44px;

    &__left {
      background-color: var(--color-basic);
      border-radius: 16px 2px 2px 16px;
      // margin-right: 4px;
      width: 100%;
      height: 16px;
    }

    &__line {
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      padding: 0 6px;
      position: absolute;
      flex-shrink: 0;
      transform: translateX(-6px);

      &::before {
        background-color: var(--color-basic);
        content: "";
        display: inline-block;
        width: 2px;
        height: 44px;
      }
    }

    &__right {
      background-color: #26bce433;
      border-radius: 2px 16px 16px 2px;
      // margin-left: 4px;
      flex-grow: 1;
      // width: 100%;
      width: calc(0% - 4px);
      height: 16px;
    }
  }
}
</style>
