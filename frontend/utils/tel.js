export const convertPhoneToForm = (val) =>
  (val?.length > 0 && val !== "+" ? "+" : "") +
  (val?.replace(/[^\w\s]/gi, "")?.replace(/\p{L}/gu, "") ?? "");

export const convertPhoneToDb = (tel) =>
  tel?.replace(new RegExp(" ", "g"), "")?.replace("+", "");
