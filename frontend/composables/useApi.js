/*
компосаблес используется для упрощения получения массива данных и работы с ним 
@api - строка в виде 'tour.getAll' - где tour - название обьекта запроса , getAll - метод запроса
@params - обьект с переменными запроса по типу {id:1}
@requestParams id 
@filters - обьект с переменными фильтра, работает только с компосаблесом useFilters (из-за проблем с прокси) - там же и extend
@callback  - функция срабатывает послк получения данных
@popup вывести алерт при ошибке
*/
import uniqueId from 'lodash/uniqueId';
import Utils, {
  formatObjectReverse,
  mergeObjectsData,
} from "~/utils/base";

import api from "~/api";

const useApi = async ({
  name,
  params = {},
  filters = {},
  unwatchedFilters = {},
  requestParams = {},
  callback = null,
  init = false,
  afterCallback = () => {},
  headers = {},
  initialValue = null,
  afterInit = () => {},
  popup = true,
} = {}) => {
  try {
    const id = uniqueId();
    const data = useState(`data-${id}`, () => null);
    const loading = useState(`loading-${id}`, () => false);
    const error = useState(`error-${id}`, () => false);
    const meta = useState(`meta-${id}`, () => []);
    const [apiName, apiMethod] = name?.split(".") ?? [null, null];
    let controller = null;
    const signal = useState(`signal${id}`, () => controller?.signal);
    //берем фильтр по имени чтобы не следить за изменениями в адресной строке

    const initialData = useState(`initialData-${id}`, () => {
      try {
        if (initialValue?.value && Array?.isArray(initialValue?.value)) {
          let temp = {};
          initialValue.value.map((item) => {
            temp[item.name] = item?.value ?? null;
          });
          return temp;
        }
        if (initialValue && Array?.isArray(initialValue)) {
          let temp = {};
          initialValue.map((item) => {
            temp[item.name] = item?.value ?? null;
          });
          return temp;
        }

        return initialValue ?? data?.value;
      } catch (error) {
        console.error(error);
      }
    });

    const getMeta = async (data = {}) => {
      try {
        const pre = {};
        let keys = Object.keys(data);
        if (keys?.includes("total")) {
          pre["current_page"] = data?.current_page;
          pre["per_page"] = data?.per_page;
          pre["last_page"] = data?.last_page;
          pre["total"] = data?.total;
          meta.value = pre;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const get = async (rParams = {}, filter = {}) => {
      try {
        if (loading?.value) {
          controller?.abort?.("same-request");
          controller = new AbortController();
          signal.value = controller.signal;
          loading.value = false;
        }
        loading.value = true;
        let pre;
        if (!initialData?.value || name) {
          if (apiName) {
            const preParams = {
              ...requestParams,
              ...rParams,
              params: {
                ...params,
                ...unwatchedFilters.value,
                ...filters?.value,
                ...filter,
                signal: signal.value,
              },
            };

            if (headers) {
              preParams["headers"] = headers;
            }

            pre = await api?.[apiName]?.[apiMethod]?.(preParams, headers)?.then(
              async (res) => {
                await getMeta(res);
                return res;
              }
            );
          }
        } else {
          pre = Utils.cloneDeep(initialData?.value);
        }

        if (pre?.isError) {
          error.value = pre;
          data.value = null;
          if (popup) {
            // pre?.popup?.();
          }
        } else {
          pre = pre?.data ?? pre?.result ?? pre;
          pre = callback?.(pre) ?? pre;
          data.value = pre;
          afterCallback?.(pre);

          if (!initialValue && data?.value) {
            initialData.value = Utils.cloneDeep(data?.value);
          }
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    };

    const loader = async (func) => {
      return async function () {
        try {
          loading.value = true;
          const response = await func();
          loading.value = false;
        } catch (error) {
          loading.value = false;
        }
      };
    };

    onMounted(async () => {
      try {
        //нужно ли делать запрос при иницилизации страницы
        if (init) {
          await get({ ...params, ...requestParams });
          afterInit();
        }
      } catch (error) {
        console.error(error);
      }
    });

    //функция для получения измененных данных
    const getClearData = (array = false) => {
      try {
        return formatObjectReverse(
          mergeObjectsData(initialData?.value, data.value, array),
          array
        );
      } catch (error) {
        console.error(error);
      }
    };

    function setData(initialValue) {
      try {
        initialData.value = initialValue;
      } catch (error) {
        console.error(error);
      }
    }

    //При изменения фильров из вне
    onMounted(() => {
      if (isReactive(filters.value)) {
        watch(
          [() => filters.value],
          async () => {
            await get({ ...params, ...filters });
          },
          { deep: true }
        );
      }
    });

    return {
      data,
      loading,
      get,
      error,
      api,
      getClearData,
      setData,
      meta,
      initialData,
      loader,
    };
  } catch (error) {
    console.error(error);
  }
};

export default useApi;
