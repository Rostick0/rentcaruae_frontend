import api from "~/api";

export default async ({ isInit = false } = {}) => {
  const exchangeRates = useState("exchangeRates", () => []);
  const currentExchangeRate = useState("currentExchangeRate", () => ({
    id: 1,
    name: "AED",
    divider: 1,
  }));

  if (isInit) {
    exchangeRates.value = await api.exchangeRate
      .getAll()
      .then((res) => res?.data);
  }

  const getConvertedPrice = (price, exchangeRate = null) =>
    Math.round(
      ((price / (exchangeRate ?? currentExchangeRate.value?.divider)) * 10) / 10
    );

  return {
    exchangeRates,
    currentExchangeRate,
    getConvertedPrice,
  };
};
