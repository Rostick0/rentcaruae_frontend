<template>
  <ul class="pagination" v-if="number > 1">
    <li v-if="page > 1 && $slots.leftIcon" @click="setPage(page - 1)">
      <slot name="leftIcon"></slot>
    </li>
    <li class="pagination-item" v-for="idx of items" v-bind:key="idx">
      <button
        class="pagination-btn"
        type="button"
        v-bind:class="{
          active: idx === modelValue,
        }"
        v-bind:disabled="!+idx"
        v-on:click="setPage(idx)"
      >
        <span>{{ idx }}</span>
      </button>
    </li>
    <li v-if="page <= meta?.total && $slots.rightIcon" @click="setPage(page + 1)">
      <slot name="rightIcon"></slot>
    </li>
  </ul>
</template>

<script setup>
// const padding = 2;

const props = defineProps({
  padding: {
    type: [Number, String],
    default: 2
  },
  meta: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: [Number, null],
  },
  limit: {
    type: Number,
    default: 20,
  },
});

const page = ref(1);
const emit = defineEmits(["update:modelValue"]);

const onChangePage = (p) => {
  const router = useRouter();
  page.value = p;
};

const setPage = (val) => {
  emit("update:modelValue", val);
  onChangePage(val);
};

const { meta, modelValue } = toRefs(props);

const number = computed(() => {
  return Math.floor(props?.meta?.total / props?.meta?.per_page);
});

const items = computed(() => {
  const result = [];
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
    if (number.value - modelValue.value - props.padding - 1 > 1) result.push("…");
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
      background-color: var(--color-green);
      color: var(--color-white);
      cursor: default;
    }
  }

  &-item {
    border: 1px solid var(--color-line);
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
