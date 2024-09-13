import groupBy from "lodash/groupBy";

export const groupByInArray = (array, name) => {
  const group = groupBy(array, name);

  return Object.keys(group).map((el) => ({
    group: el,
    value: group[el],
  }));
};

export const removeSpaces = (str) => str?.replace?.(new RegExp(" ", "g"), "");

export const pluralize = (word, count) => {
  if (count > 1) {
    if (word.endsWith("y") && !"aeiou".includes(word[word.length - 2]))
      return word.slice(0, -1) + "ies";

    if (
      word.endsWith("s") ||
      word.endsWith("sh") ||
      word.endsWith("ch") ||
      word.endsWith("x") ||
      word.endsWith("z")
    )
      return word + "es";

    return word + "s";
  }

  return word;
};

export const valueOrDefault = (value, defaultVal) =>
  value ? value : defaultVal;
