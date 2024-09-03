export const daysWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const convertTimeToEdit = (timeString) => {
  if (!timeString)
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  const timeSplit = timeString?.split?.(":");

  return {
    hours: timeSplit?.[0],
    minutes: timeSplit?.[1],
    seconds: timeSplit?.[2],
  };
};

export const convertTimeToDb = (times) =>
  [0, 1].map(
    (i) =>
      `${times?.[i]?.hours}`?.padStart(2, "0") +
      ":" +
      `${times?.[i]?.minutes}`?.padStart(2, "0") +
      ":" +
      `${times?.[i]?.seconds}`?.padStart(2, "0")
  );
