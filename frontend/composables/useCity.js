import api from "~/api";

export default async () => {
  const cities = useState("cities", () => []);
  const currentCity = useState("currentCity");

  if (!cities.value?.length) {
    const res = await api.cities.getAll();

    cities.value = await res?.data;
  }

  return {
    cities,
  };
};
