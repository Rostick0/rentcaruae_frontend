import api from "~/api";

export default async () => {
  const generations = useState("generations", () => []);

  if (!generations?.value?.length) {
    const res = await api.distinctValue.getAll({
      params: {
        table: "generations",
        column: "name",
        sort: "-name",
        limit: 8,
      },
    });

    generations.value = await res?.data;
  }

  return {
    generations,
  };
};
