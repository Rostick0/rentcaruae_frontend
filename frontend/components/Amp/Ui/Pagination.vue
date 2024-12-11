<template>
  <ul class="pagination" v-if="number > 1">
    <li class="pagination-item" v-for="idx of items" v-bind:key="idx">
      <NuxtLink
        class="pagination-btn"
        :class="{
          active: idx === modelValue,
        }"
        :disabled="!+idx"
        :to="getUrl(idx)"
      >
        <span>{{ idx }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import isEmpty from "lodash/isEmpty";
const route = useRoute();

const localePath = useLocalePath();

const getUrl = (pageNumber) => {
  return localePath(
    `${
      route.path.replace("/amp", "").replace(/page-[a-zA-Z0-9]+/g, "") +
      (!route.params?.page ? "/" : "")
    }page-${pageNumber}${
      !isEmpty(route.query)
        ? "?" + new URLSearchParams(route.query).toString()
        : "/"
    }`.replace("//", "/")
  );
};

// const padding = 2;

const props = defineProps({
  padding: {
    type: [Number, String],
    default: 4,
  },
  meta: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: [Number, null],
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { modelValue } = toRefs(props);

const number = computed(() =>
  Math.floor(props?.meta?.total / props?.meta?.per_page)
);

const items = computed(() => {
  const start = (() => {
    const result = [];
    result.push(modelValue.value);
    for (let i = 1; i <= props.padding; i++) {
      const target = modelValue.value - i;
      if (target > 0) result.push(target);
    }
    if (modelValue.value - props.padding - 1 - 1 === 1) result.push(2);
    if (modelValue.value - props.padding - 1 - 1 > 1) result.push("…");
    if (modelValue.value - props.padding > 1) result.push(1);
    return result;
  })();
  const end = (() => {
    const result = [];
    for (let i = 1; i <= props.padding; i++) {
      const target = modelValue.value + i;
      if (target <= number.value) result.push(target);
    }
    if (number.value - modelValue.value - props.padding - 1 === 1)
      result.push(number.value - 1);
    if (number.value - modelValue.value - props.padding - 1 > 1)
      result.push("…");
    if (number.value - (modelValue.value + props.padding - 1) > 1)
      result.push(number.value);
    return result;
  })();

  return start.reverse().concat(end);
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &-btn {
    border-radius: inherit;
    color: #000;
    font-size: 14px;
    padding: 8px;
    min-width: 40px;

    &:disabled {
      cursor: no-drop;
    }

    &.active {
      // background-color: var(--color-green);
      color: var(--color-basic);
      cursor: default;
    }
  }

  &-item {
    border: 1px solid var(--color-basic);
    border-right-width: 0;
    display: flex;
    justify-content: center;
    text-align: center;

    // border-radius: 12px;
    // background: #fff;
    // &:hover {
    //   background-color: #a4bcf857;
    // }

    &:first-child {
      border-radius: 8px 0 0 8px;
    }

    &:last-child {
      border-radius: 0 8px 8px 0;
      border-right-width: 1px;
    }
  }
}
</style>
