export default () => {
  const setRentalPeriods = (cityName) => [
    {
      name: "Daily rental",
      link: `/${cityName}/daily`,
    },
    {
      name: "Weekly rental",
      link: `/${cityName}/weekly`,
    },
    {
      name: "Monthly rental",
      link: `/${cityName}/monthly`,
    },
    {
      name: "Car leasing",
      link: `/${cityName}/leasing`,
    },
  ];

  const currentCity = useState("currentCity");

  const rentalPeriods = useState("rentalPeriods", () => []);

  if (currentCity.value?.name) {
    rentalPeriods.value = setRentalPeriods(
      currentCity.value?.name?.toLowerCase?.()
    );
  }

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
