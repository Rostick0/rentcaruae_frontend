export const periodOptions = [
  {
    id: 1,
    name: "daily",
    period: 1,
  },
  {
    id: 2,
    name: "weekly",
    period: 7,
  },
  {
    id: 3,
    name: "monthly",
    period: 30,
  },
];

export const getPeriodParam = (val) =>
  periodOptions.find((item) => item.name === val)?.period;

export const getPeriodName = (val) =>
  periodOptions.find((item) => item.period === val)?.name;

export const convertPeriod = (val) => {
  if (val == 1) return "day";

  if (val == 7) return "week";

  if (val < 30) return `${val} days`;

  const valFloor = Math.floor(val);

  return valFloor == 1 ? valFloor + " " : "" + "month";
};
