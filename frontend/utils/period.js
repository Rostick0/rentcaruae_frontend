export const periodOptions = [
  {
    id: 1,
    name: "daily",
  },
  {
    id: 2,
    name: "month",
  },
];

export const convertPeriod = (val) => {
  if (val == 1) return "day";

  if (val == 7) return "week";

  if (val < 30) return `${val} days`;

  const valFloor = Math.floor(val);

  return valFloor == 1 ? valFloor + " " : "" + "month";
};
