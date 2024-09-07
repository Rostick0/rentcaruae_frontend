import startCase from "lodash/startCase";

export const getCatalogBreadCrumbs = ({ currentCity, rent, oneFilterType }) => {
  const cityLink = convertNameToUrl(`/${currentCity?.name}`);

  const data = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: currentCity?.name,
      link: cityLink,
    },
  ];

  if (rent === "leasing")
    return [
      ...data,
      {
        name: `Car ${rent} in ${currentCity?.name}`,
        link: `${cityLink}/leasing`,
      },
    ];

  if (oneFilterType?.type && oneFilterType?.value) {
    return [
      ...data,
      { name: startCase(oneFilterType.type) },
      {
        name: oneFilterType.value,
        link: convertNameToUrl(
          `${cityLink}/${oneFilterType.type}/${oneFilterType.value}`
        ),
      },
    ];
  }

  return data;
};
