import startCase from "lodash/startCase";
import api from "~/api";

export const setCatalogUrl = (val, page) =>
  val?.split("/page")[0] + (page > 1 ? `page-${page}/` : "");

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

export const getCatalogSeo = (
  { type, value },
  city,
  pageText,
  isLeasing,
  t
) => {
  if (isLeasing)
    return {
      title: t("catalog_seo.leasing.title", {
        cityName: city?.name,
        pageText,
      }).trimEnd(),
      description: t("catalog_seo.leasing.description", {
        cityName: city?.name,
      }),
      h1: t("catalog_seo.leasing.h1", {
        cityName: city?.name,
        pageText,
      }).trimEnd(),
    };

  if (type === "type") {
    const val = t(`categoriesList.${value}`);

    return {
      title: t("catalog_seo.type.title", {
        value: val,
        cityName: city?.name,
        pageText,
      }).trimEnd(),
      description: t("catalog_seo.type.description", {
        value: val,
        cityName: city?.name,
      }),
      h1: t("catalog_seo.type.h1", {
        value: val,
        cityName: city?.name,
        pageText,
      }).trimEnd(),
    };
  }

  if (type === "brand" || type === "modelcar")
    return {
      title: t("catalog_seo.brandOrModel.title", {
        value,
        cityName: city?.name,
      }),
      description: t("catalog_seo.brandOrModel.description", {
        value,
        cityName: city?.name,
      }),
      h1: t("catalog_seo.brandOrModel.h1", {
        value,
        cityName: city?.name,
        pageText,
      }).trimEnd(),
    };

  if (type === "body") {
    const val = t(`bodyTypesList.${value}`);

    return {
      title: t("catalog_seo.body.title", {
        value: val,
        cityName: city?.name,
        pageText,
      }).trimEnd(),
      description: t("catalog_seo.body.description", {
        value: val,
        cityName: city?.name,
      }),
      h1: t("catalog_seo.body.h1", {
        value: val,
        cityName: city?.name,
        pageText,
      }).trimEnd(),
    };
  }

  if (type === "period") {
    const val = startCase(t(value?.toLowerCase()));

    return {
      title: t("catalog_seo.period.title", {
        value: val,
        pageText,
      }).trimEnd(),
      description: t("catalog_seo.body.description", {
        value: val,
        cityName: city?.name,
      }),
      h1: t("catalog_seo.body.h1", {
        value: val,
        cityName: city?.name,
        pageText,
      }).trimEnd(),
    };
  }

  return {};
};
