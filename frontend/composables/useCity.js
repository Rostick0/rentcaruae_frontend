import api from "~/api";

export default async () => {
  const citiesAll = useState("citiesAll", () => []);
  const cities = useState("cities", () => []);
  const currentCity = useState("currentCity");

  if (!cities.value?.length || !citiesAll.value?.length) {
    const res = await api.cities.getAll({
      params: {
        "filterNEQ[car_cities.id]": true,
      },
    });
    cities.value = res?.data;

    api.cities.getAll().then((res) => (citiesAll.value = res?.data));
  }

  return {
    cities,
    currentCity,
  };
};
