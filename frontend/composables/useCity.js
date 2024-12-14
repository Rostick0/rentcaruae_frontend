import api from "~/api";

export default async () => {
  const { t, locale } = useI18n();

  const citiesAll = useState("citiesAll", () => []);
  const cities = useState("cities", () => []);
  const currentCity = useState("currentCity");

  const translatedCities = useState("translatedCities", () => []);

  const updateTranslatedCities = () => {
    translatedCities.value = [...cities.value].map((item) => ({
      ...item,
      name: t(`cities.${item?.name}`),
    }));
  };

  if (!cities.value?.length || !citiesAll.value?.length) {
    const res = await api.cities.getAll({
      params: {
        "filterNEQ[car_cities.id]": true,
      },
    });
    cities.value = res?.data;
    const findedCity = cities.value?.find((item) => item?.name === "Dubai");
    currentCity.value = {
      ...findedCity,
      name: t(`cities.${findedCity?.name}`),
    };
    console.log(currentCity.value);

    api.cities.getAll().then((res) => {
      citiesAll.value = res?.data;
      updateTranslatedCities();
    });
  }

  watch(
    () => locale.value,
    () => {
      updateTranslatedCities();

      const findedCity = cities.value.find(
        (item) => item?.id == currentCity.value?.id
      );
      currentCity.value = {
        ...findedCity,
        name: t(`cities.${findedCity?.name}`),
      };
    }
  );

  return {
    cities,
    currentCity,
  };
};
