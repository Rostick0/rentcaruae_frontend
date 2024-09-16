// const periods = {
//   daily: 1,
//   weekly: 7,
//   monthly: 30,
// };

export const convertNameToUrl = (name) =>
  typeof name === "string"
    ? encodeURIComponent(
        name.toLowerCase().replace(new RegExp(" ", "g"), "_")
      )?.replace(new RegExp("%2F", "g"), "/")
    : "";

export const convertUrlToName = (name) =>
  decodeURIComponent(`${name}`?.replace?.(new RegExp("_", "g"), " "));

export const setOneFilterValue = (routeParams, param = "") => {
  const data = {};

  if (routeParams?.period)
    data[`filterEQ[${param}price.period]`] = getPeriodParam(
      routeParams?.period
    );
  else if (routeParams?.body)
    data[`filterEQ[${param}generation.name]`] = convertUrlToName(
      routeParams?.body
    );
  else if (routeParams?.type)
    data[`filterEQ[${param}car_categories.category.name]`] = convertUrlToName(
      routeParams?.type
    );
  else if (routeParams?.brand)
    data[`filterEQ[${param}generation.model_car.brand.name]`] =
      convertUrlToName(routeParams?.brand);
  else if (routeParams?.modelcar)
    data[`filterEQ[${param}generation.model_car.name]`] = convertUrlToName(
      routeParams?.modelcar
    );

  return data;
};

// export const replaceAmp = (string) => string?.replace?.("/amp", "");

// export const updateQueryParams = (oldParams, newParams) => ({
//   ...oldParams,
//   newParams,
// });
