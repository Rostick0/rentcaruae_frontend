import uniqueId from "lodash/uniqueId";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import pickBy from "lodash/pickBy";

export default ({
  initialFilters = {},
  withQueryParams = false,
  withInitQueryParams = false,
  debounceMs = 500,
} = {}) => {
  const id = uniqueId();
  const router = useRouter();
  const filters = useState("filters-" + id, () => initialFilters);

  if (withInitQueryParams) {
    // onMounted(() => {
    const params = useRoute().query;
    filters.value = {
      ...filters.value,
      ...params,
    };
    // });
  }

  const resetFilterValues = () => {
    filters.value = {};
    if (withQueryParams) router.replace({ query: {} });
  };

  const urlSerachParams = computed(() =>
    filters.value ? "?" + new URLSearchParams(filters.value).toString() : ""
  );

  watch(
    () => cloneDeep(filters.value),
    debounce((newVal) => {
      if (withQueryParams)
        router.replace({
          query: pickBy(
            newVal,
            (value) => value !== "" && value !== null && value !== undefined
          ),
        });
    }, debounceMs)
  );
  return {
    filters,
    resetFilterValues,
    urlSerachParams,
  };
};
