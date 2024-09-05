import startCase from "lodash/startCase";
import api from "~/api";

export const setCatalogUrl = (val, page) =>
  val?.split("/page")[0] + (page > 1 ? `/page-${page}` : "");

export const getNameTypeCatalog = async (type, value) => {
  const types = {
    brand: "brands",
    body: "generations",
    modelcar: "modelCars",
    type: "categories",
  };

  return await api?.[types[type]]
    ?.getAll({
      params: {
        limit: 1,
        "filterEQ[name]": value,
      },
    })
    ?.then((res) => res?.data?.[0]?.name);
};

export const getOneFilterType = async (routeParams) => {
  const whiteListForFetch = ["body", "type", "brand", "modelcar"];
  const whiteList = [...whiteListForFetch, "period"];
  const keys = Object.keys(routeParams);
  const result = {};

  keys?.some((item) => {
    if (!whiteList.find((i) => i === item)) return;

    result.type = item;
    result.value = startCase(routeParams[item]);

    return true;
  });

  if (whiteListForFetch?.find((item) => item === result?.type)) {
    result.value =
      (await getNameTypeCatalog(result?.type, result?.value)) ?? result.value;
  }

  return result;
};

export const getCatalogSeo = ({ type, value }, city, pageText, isLeasing) => {
  if (isLeasing)
    return {
      title:
        `Car leasing in ${city?.name}, flexible monthly plans and best Deals in ${pageText}`.trimEnd(),
      description: `Lease a car for long term basis in ${city?.name}. Relive yourself from your travel troubles in ${city?.name}. We feature quality vehicles for all occasions, including luxury cars, sports cars, and economy models.`,
      h1: `Lease a Car in ${city?.name} ${pageText}`.trimEnd(),
    };

  if (type === "type")
    return {
      title:
        `Rent ${value} Car in ${city?.name}, UAE - ${value} Cars Rental in ${city?.name} ${pageText}`.trimEnd(),
      description: `Find ${value} car rentals in ${city?.name} at RentcarUAE from local car hire suppliers. Daily, weekly and monthly car rental packages available. Cash and online payment.`,
      h1: `${value} cars for rent in ${city?.name} ${pageText}`.trimEnd(),
    };

  if (type === "brand" || type === "modelcar")
    return {
      title: `${value} rental in ${city?.name}, hire a ${value} in rentcaruae`,
      description: `Choose ${value} rentals offered by rental companies in ${city?.name}. Free delivery in ${city?.name}.`,
      h1: `Rent ${value} in ${city?.name} ${pageText}`.trimEnd(),
    };

  if (type === "body")
    return {
      title:
        `Rent a ${value} Car in ${city?.name} | Rental ${value} UAE price ${pageText}`.trimEnd(),
      description: `Rent ${value} car ${city?.name}, Best Deals to hire a ${value}. You can rent a ${value} online`,
      h1: `${value} car for rent in ${city?.name} ${pageText}`.trimEnd(),
    };

  if (type === "period")
    return {
      title:
        `${value} Car Rental Dubai, UAE | Best Rates | Hire cars per ${value} ${pageText}`.trimEnd(),
      description: `${value} car rental deals. Large vehicle fleet. Cheap ${value} rent online in ${city?.name}`,
      h1: `${value} Car Rental ${city?.name} ${pageText}`.trimEnd(),
    };

  return {};
};
