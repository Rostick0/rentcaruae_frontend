export const convertNameToUrl = (name) =>
  typeof name === "string"
    ? encodeURIComponent(name.toLowerCase().replace(new RegExp(" ", "g"), "_"))
    : "";

export const convertUrlToName = (name) =>
  decodeURIComponent(name.replace(new RegExp("_", "g"), " "));

// .replace(new RegExp(" ", "g"), "_")
