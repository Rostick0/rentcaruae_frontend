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

export const convertTel = (tel) => [
  optionsNumbers.find((i) => i.id === tel?.substring(0, tel?.length - 10)),
  tel?.substring(tel?.length - 10),
];
