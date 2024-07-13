<template>
  <div
    class="stack"
    :class="
      (flex !== undefined ? ' stack-flex-' + flex : '') +
      (gap !== undefined ? ' stack-gap-' + gap : '') +
      (flexDirection ? ' stack-' + flexDirection : ' stack-row') +
      (marginX ? ' stack-marginX-' + marginX : '') +
      (marginY ? ' stack-marginY-' + marginY : '') +
      (marginTop ? ' stack-marginTop-' + marginTop : '') +
      (marginBottom ? ' stack-marginBottom-' + marginBottom : '') +
      (justifyContent ? ' stack-' + justifyContent : '') +
      (alignItems ? ' stack-align-items-' + alignItems : '') +
      (padding ? ' stack-padding-' + padding : '') +
      (paddingY ? ' stack-paddingY-' + paddingY : '') +
      (paddingX ? ' stack-paddingX-' + paddingX : '') +
      (backgroundColor ? ' stack-bg-' + backgroundColor : '') +
      (flexWrap ? ' stack-wrap-' + flexWrap : '')
    "
    :style="{ background: background ?? '' }"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  flexDirection?: "column" | "row";
  gap?: "0" | "1" | "2" | "3" | "4" | "5";
  marginY?: "1" | "2" | "3" | "4" | "5";
  marginX?: "1" | "2" | "3" | "4" | "5";
  marginTop?: "1" | "2" | "3" | "4" | "5";
  marginBottom?: "1" | "2" | "3" | "4" | "5";
  justifyContent?: "space-between" | "center" | "space-around";
  alignItems?: "center" | "flex-end";
  padding?: "1" | "2" | "3" | "4" | "5";
  paddingY?: "1" | "2" | "3" | "4" | "5";
  paddingX?: "1" | "2" | "3" | "4" | "5";
  backgroundColor?: "standard" | "danger" | "green" | "primary";
  flex?: "same-all" | "stretch-all";
  flexWrap?: "wrap";
  background?: string;
}

defineProps<Props>();
</script>

<style lang="scss"></style>
