import groupBy from "lodash/groupBy";

export const groupByInArray = (array, name) => {
  const group = groupBy(array, name);

  return Object.keys(group).map((el) => ({
    group: el,
    value: group[el],
  }));
};
