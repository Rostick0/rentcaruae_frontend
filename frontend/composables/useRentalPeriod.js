export default () => {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const setRentalPeriods = (cityName) => [
    {
      name: t("rentalPeriod.Daily rental"),
      link: localePath(`/${cityName}/daily`),
    },
    {
      name: t("rentalPeriod.Weekly rental"),
      link: localePath(`/${cityName}/weekly`),
    },
    {
      name: t("rentalPeriod.Monthly rental"),
      link: localePath(`/${cityName}/monthly`),
    },
    {
      name: t("rentalPeriod.Car leasing"),
      link: localePath(`/${cityName}/leasing`),
    },
  ];

  const currentCity = useState("currentCity");

  const rentalPeriods = useState("rentalPeriods", () =>
    currentCity.value?.name
      ? setRentalPeriods(currentCity.value?.name?.toLowerCase?.())
      : []
  );

  // if (currentCity.value?.name) {
  //   rentalPeriods.value = setRentalPeriods(
  //     currentCity.value?.name?.toLowerCase?.()
  //   );
  // }

  watch(
    () => currentCity.value,
    (newV) => {
      if (!newV?.name) return;

      rentalPeriods.value = setRentalPeriods(newV?.name?.toLowerCase?.());
    }
  );

  return {
    rentalPeriods,
  };
};
