export default () => {
  const currentCity = useState("currentCity");
  const rentalPeriods = useState("rentalPeriods", () => [
    {
      name: "Daily rental",
      link: `/${currentCity.value?.name}/leasing`,
    },
    {
      name: "Weekly rental",
      link: `/${currentCity.value?.name}/leasing`,
    },
    {
      name: "Monthly rental",
      link: `/${currentCity.value?.name}/leasing`,
    },
    {
      name: "Car leasing",
      link: `/${currentCity.value?.name}/leasing`,
    },
  ]);

  return {
    rentalPeriods,
  };
};
