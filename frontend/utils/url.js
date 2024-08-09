export const convertNameToUrl = (name) =>
  typeof name === "string"
    ? encodeURIComponent(
        name.toLowerCase().replace(new RegExp(" ", "g"), "_")
      )?.replace(new RegExp("%2F", "g"), "/")
    : "";

export const convertUrlToName = (name) =>
  decodeURIComponent(name.replace(new RegExp("_", "g"), " "));

export const setOneFilterValue = (routeParams) => {
  if (routeParams?.body)
    return { "filterEQ[generation.name]": routeParams?.body };
  if (routeParams?.type)
    return { "filterEQ[category.name]": routeParams?.type };
  if (routeParams?.brand) return { "filterEQ[generation.model_car.brand.name]": routeParams?.brand };
  return {};
};
