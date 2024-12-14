import startCase from "lodash/startCase";

export const getCatalogBreadCrumbs = ({
  localePath,
  t,
  currentCity,
  rent,
  oneFilterType,
}) => {
  const cityLink = convertNameToUrl(`/${currentCity?.name}`);

  const data = [
    {
      name: t("home"),
      link: localePath("/"),
    },
    {
      name: t(currentCity?.name),
      link: localePath(cityLink + "/"),
    },
  ];

  if (rent === "leasing")
    return [
      ...data,
      {
        name: `Car ${rent} in ${currentCity?.name}`,
        link: localePath(`${cityLink}/leasing/`),
      },
    ];

  if (oneFilterType?.type && oneFilterType?.value) {
    return [
      ...data,
      { name: startCase(oneFilterType.type) },
      {
        name: oneFilterType.value,
      },
    ];
  }

  return data;
};
