<template>
  <UiSelectAlternative
    v-if="isAlternative"
    @scrolled-bottom="debounceHandleScrollToBottom"
    @scrolled-top="debounceHandleScrollToTop"
    v-bind="props"
    :options="currentOptions"
    v-model="modelValue"
    v-model:search-string="searchString"
    :is-searchable="isSearchable"
    :page="page"
    :totalPages="totalPages"
  />
  <UiSelect
    v-else
    @scrolled-bottom="debounceHandleScrollToBottom"
    @scrolled-top="debounceHandleScrollToTop"
    v-bind="props"
    :options="currentOptions"
    v-model="modelValue"
    v-model:search-string="searchString"
    :is-searchable="!!searchFn && isSearchable"
  />
</template>

<script setup>
import debounce from 'lodash/debounce'

const props = defineProps({
  limit: {
    type: Number,
    default: 20,
  },
  options: {
    type: [Array],
    default: [],
  },
  modelValue: {
    type: [Object, Number, String, Array],
  },
  searchFn: {
    type: Function,
  },
  isSearchable: {
    type: [Boolean, Function],
    default: true,
  },
  onChange: {
    type: Function,
  },
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  debounceMs: {
    type: [Number, String],
    default: 200,
  },
  forceDeps: Boolean,
  isAlternative: {
    type: Boolean,
    default: false,
  },
  defaultSearchString: String,
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const currentOptions = ref(props.options || []);
const currentSearchLimit = ref(props.limit);
const searchString = ref(
  props.defaultSearchString ??
    modelValue.value?.name ??
    modelValue.value?.value ??
    ""
);
const page = ref(1);
const totalPages = ref();

const debounceHandleScrollToBottom = debounce(
  handleScrollToBottom,
  props.debounceMs
);
const debounceHandleScrollToTop = debounce(
  handleScrollToTop,
  props.debounceMs
);

const debounceHandleSearch = debounce(handleSearch, props.debounceMs);

// Контекст данного селекта, может понадобится для кастомизации специфичных моментов
const ctx = computed(() => ({
  searchString: searchString.value,
  searchFn: props.searchFn,
  handleSearch: handleSearch,
  debounceHandleSearch: debounceHandleSearch,
  initialOptions: props.options,
  currentOptions: currentOptions.value,
  updateCurrentOptions: (options) => (currentOptions.value = options),
  modelValue: props.modelValue,
  updateModelValue: (value) => emits("update:modelValue", value),
}));

// При изменении поисковой строки вызывает handleSearch с задержкой
watch(
  searchString,
  async () => {
    page.value = 1;
    await debounceHandleSearch(searchString.value);
  },
  {
    immediate: true,
  }
);

// Срабатывает при изменении зависимостей в массиве deps
watch(
  () => props.deps,
  (cur, prev) => {
    if (
      Array.isArray(prev)
        ? prev.find((item) => item !== undefined)
        : prev !== undefined
    ) {
      props?.onDepsChange?.(ctx.value);
    }
  },
  {
    deep: true,
    immediate: props.forceDeps,
  }
);

// Срабатывает при изменении выбора
watch(
  () => props.modelValue,
  async () => {
    props.onChange?.(ctx.value);
  },
  {
    deep: true,
    immediate: true,
  }
);

// Записывает новый массив на основе поисковой строки и лимита, вызывается при вводе символов
async function handleSearch(_searchString) {
  if (!props.searchFn) return;
  currentSearchLimit.value = props.limit;

  const options = await props.searchFn(
    ctx.value,
    searchString.value,
    currentSearchLimit.value,
    page.value
  );

  page.value = 1;
  totalPages.value = options?.last_page;
  currentOptions.value = [...options.data];
}

async function handleScrollToTop(div) {
  return;
  // if (!props.searchFn) return;

  // if (page.value <= 2) {
  //   return;
  // }
  // page.value--;

  // const first = await props.searchFn(
  //   ctx.value,
  //   searchString.value,
  //   currentSearchLimit.value,
  //   page.value - 1
  // );
  // const second = await props.searchFn(
  //   ctx.value,
  //   searchString.value,
  //   currentSearchLimit.value,
  //   page.value
  // );
  // const last = await props.searchFn(
  //   ctx.value,
  //   searchString.value,
  //   currentSearchLimit.value,
  //   page.value + 1
  // );
  // currentOptions.value = [...first, ...second, ...last];

  // div.scrollTo(0, div.children[0].clientHeight / 15);
}

async function handleScrollToBottom() {
  if (!props.searchFn) return;

  page.value++;

  const newPages = await props.searchFn(
    ctx.value,
    searchString.value,
    currentSearchLimit.value,
    page.value
  );

  totalPages.value = newPages?.last_page;
  currentOptions.value = [...currentOptions.value, ...newPages.data];
}
</script>
