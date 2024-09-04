import startCase from "lodash/startCase";

export const getCatalogBreadCrumbs = ({ currentCity, rent, oneFilterType }) => {
  const data = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: currentCity?.name,
      link: convertNameToUrl(`/${currentCity?.name}`),
    },
  ];

  if (rent === "leasing")
    return [...data, { name: `Car ${rent} in ${currentCity.name}` }];

  if (oneFilterType?.type && oneFilterType?.value) {
    return [
      ...data,
      { name: startCase(oneFilterType.type) },
      { name: oneFilterType.value },
    ];
  }

  return data;
};
