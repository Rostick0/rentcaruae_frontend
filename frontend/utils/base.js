import { useToast } from "vue-toastification";
import isObject from "lodash/isObject";
const toast = useToast();

export const warningPopup = (message = "Упс, что-то пошло не так!") => {
  try {
    toast.error(message, 2000);
  } catch (error) {
    console.error("warningPopup", error);
  }
};

export function getErrorData(error, aborted) {
  try {
    if (aborted) {
      return;
    }
    let errorMessage = `${
      error?.data?.errors?.message ??
      error?.message ??
      `Что то пошло не так: ${error}`
    }`;

    if (error?.data?.errors?.messages) {
      for (let message in error?.data?.errors?.messages) {
        errorMessage += ": " + error?.data?.errors?.messages[message];
      }
    }

    if (isObject(error?.data?.errors)) {
      for (let message in error?.data?.errors) {
        errorMessage += ": " + error?.data?.errors[message];
      }
    }

    const popup = () => {
      // toast.error(errorMessage, 2000);
    };

    return {
      error: true,
      isError: true,
      message: errorMessage,
      errorResponse: error,
      popup: popup,
    };
  } catch (error) {
    console.error("notify", error);
  }
}

export const notify = (error) => {
  try {
    let errorMessage = `${
      error?.data?.errors?.message ??
      error?.message ??
      `Что то пошло не так: ${error}`
    }`;
    if (error?.data?.errors?.messages) {
      for (let message in error?.data?.errors?.messages) {
        errorMessage += ": " + error?.data?.errors?.messages[message];
      }
    }
    toast.error(errorMessage);
  } catch (error) {
    console.error("notify", error);
  }
};

export const success = (message = "Данные успешно сохранены") => {
  try {
    toast.success(message, 2000);
  } catch (error) {
    console.error(error);
  }
};

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function objNotEmpty(obj) {
  if (typeof obj !== "object" || obj == null) return;
  return !!Object.keys(obj).length;
}

export const mergeObjectsData = (initialData, data, formatArray) => {
  try {
    let pre = {};
    if (Utils.isObject(initialData)) {
      Object.entries(initialData).forEach(([key, value]) => {
        // console.error(initialData);
        if (Utils.isObject(value)) {
          pre[key] = mergeObjectsData(value, data[key]);
        } else {
          if (JSON.stringify(value) == JSON.stringify(data[key])) {
            pre[key] = { value: value, edit: false };
          } else {
            pre[key] = { value: data[key], edit: true };
          }
        }
      });

      return pre;
    } else if (Array.isArray(initialData) && formatArray) {
      pre = initialData.map((item, idx) => {
        return mergeObjectsData(item, data[idx]);
      });
      return pre;
    } else {
      return initialData.value;
    }
  } catch (error) {
    console.error("formatObject", error);
  }
};

export const formatObject = (data, formatArray) => {
  //**formatArray -нужно ли обрабатывать вложенный массив  */
  try {
    let pre = {};
    if (Utils.isObject(data)) {
      Object.entries(data).forEach(([key, value]) => {
        if (Utils.isObject(value) || Array.isArray(value)) {
          pre[key] = formatObject(value, formatArray);
        } else {
          pre[key] = { value: value, edit: false };
        }
      });
      return pre;
    } else if (Array.isArray(data) && formatArray) {
      pre = data.map((item) => {
        return formatObject(item, formatArray);
      });

      return pre;
    } else {
      return data;
    }
  } catch (error) {
    console.error("formatObject", error);
  }
};
export const formatObjectReverse = (
  data,
  getId = false,
  formatArray = true
) => {
  //**formatArray -нужно ли обрабатывать вложенный массив  */
  try {
    let pre = {};
    if (Utils.isObject(data)) {
      Object.entries(data).forEach(([key, value]) => {
        if (
          Utils.isObject(value) &&
          Object?.keys(value)?.length &&
          !Object?.keys(value)?.includes("edit")
        ) {
          let val = formatObjectReverse(value, getId);
          if (val) {
            pre[key] = val;
            if (getId && data.hasOwnProperty("id")) pre["id"] = data?.id?.value;
          } else {
            return null;
          }
        } else {
          if (value?.edit && value?.value) {
            pre[key] = value?.value;
          }
        }
      });
      if (Utils.objNotEmpty(pre)) return pre;
    } else if (Array.isArray(data) && formatArray) {
      pre = data
        .map((item) => {
          return formatObjectReverse(item, getId);
        })
        .filter((item) => !!item);
      return pre;
    } else {
      return data;
    }
  } catch (error) {
    console.error("formatObjectReverse", error);
  }
};

const Utils = {
  isObject,
  objNotEmpty,
  cloneDeep,
  warningPopup,
  getErrorData,
  notify,
  success,
};

export default Utils;
