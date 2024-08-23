export const convertNameToUrl = (name) =>
  typeof name === "string"
    ? encodeURIComponent(
        name.toLowerCase().replace(new RegExp(" ", "g"), "_")
      )?.replace(new RegExp("%2F", "g"), "/")
    : "";

export const convertUrlToName = (name) =>
  decodeURIComponent(name.replace(new RegExp("_", "g"), " "));

export const setOneFilterValue = (routeParams, param = "") => {
  const data = {};

  if (routeParams?.body)
    data[`filterEQ[${param}generation.name]`] = routeParams?.body;
  else if (routeParams?.type)
    data[`filterEQ[${param}category.name]`] = routeParams?.type;
  else if (routeParams?.brand)
    data[`filterEQ[${param}generation.model_car.brand.name]`] = routeParams?.brand;
  else if (routeParams?.modelcar)
    data[`filterEQ[${param}generation.model_car.name]`] = routeParams?.modelcar;

  return data;
};
