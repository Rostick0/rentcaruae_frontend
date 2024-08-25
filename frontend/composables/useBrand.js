import api from "~/api";

export default async () => {
  const brands = useState("brands", () => []);

  if (!brands?.value?.length) {
    const res = await api.brands.getAll({
      params: {
        extendsCount: "cars",
        sort: "cars_count,-name",
        "filterNEQN[model_cars.generations.cars.id]": true,
        limit: 24,
      },
    });

    brands.value = await res?.data;
  }

  return {
    brands,
  };
};
