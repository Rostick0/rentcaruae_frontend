<template>
  <UiMSelectAlternative
    v-if="isAlternative"
    @scrolled-bottom="debounceHandleScrollToBottom"
    v-bind="props"
    ref="exposedValues"
    :options="currentOptions"
    v-model="modelValue"
    v-model:search-string="searchString"
    :is-searchable="!!searchFn"
    :page="page"
    :totalPages="totalPages"
  />
  <UiMSelect
    v-else
    @scrolled-bottom="debounceHandleScrollToBottom"
    v-bind="props"
    ref="exposedValues"
    :options="currentOptions"
    v-model="modelValue"
    v-model:search-string="searchString"
    :is-searchable="!!searchFn"
  />
</template>

<script setup>
import debounce from 'lodash/debounce';

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
    type: Array,
  },
  searchFn: {
    type: Function,
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
    default: 600,
  },
  forceDeps: Boolean,
  isAlternative: Boolean,
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

const page = ref(1);
const totalPages = ref();

const currentOptions = ref(props.options || []);
const currentSearchLimit = ref(props.limit);
const searchString = ref("");

const debounceHandleScrollToBottom = debounce(
  handleScrollToBottom,
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
  updateCurrentOptions: (values) => (currentOptions.value = values),
  currentOptions: currentOptions.value,
  modelValue: props.modelValue,
  updateModelValue: (value) => emits("update:modelValue", value),
}));

// При изменении поисковой строки вызывает handleSearch с задержкой
watch(
  searchString,
  async () => {
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

// Записывает новый массив после скролла и двигает лимит вперёд, вызывается при скролле
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
