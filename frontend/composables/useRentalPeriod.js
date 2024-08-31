export default () => {
  const currentCity = useState("currentCity");

  const rentalPeriods = useState("rentalPeriods", () => []);

  watch(
    () => currentCity.value,
    (newV) => {
      const cityName = newV?.name?.toLowerCase();

      rentalPeriods.value = [
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
    }
  );

  return {
    rentalPeriods,
  };
};
