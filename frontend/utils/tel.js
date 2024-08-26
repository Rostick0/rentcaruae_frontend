export const optionsNumbers = [
  {
    id: 971,
    name: "+971",
    icon_url: "images/flags/ae.svg",
  },
  {
    id: 7,
    name: "+7",
    icon_url: "images/flags/ru.svg",
  },
];

export const convertTelToForm = (tel) => [
  optionsNumbers.find((i) => i.id === tel?.substring(0, tel?.length - 10)),
  tel?.substring(tel?.length - 10),
];

// export const convertTelToDb = (tel) =>
//   tel?.join("")?.replace(new RegExp(" ", "g"), "")?.replace("+", "");

// export const convertTelToDbOrNull = (tel) =>
//   tel?.[1] ? convertTelToDb(tel) : null;

export const convertPhoneToForm = (val) =>
  (val?.length > 0 && val !== "+" ? "+" : "") +
  (val?.replace(/[^\w\s]/gi, "")?.replace(/\p{L}/gu, "") ?? "");

export const convertPhoneToDb = (tel) =>
  tel?.replace(new RegExp(" ", "g"), "")?.replace("+", "");

// export const convertPhoneToDbOrNull = (val) => {};
