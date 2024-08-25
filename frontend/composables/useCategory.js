import api from "~/api";

export default async () => {
  const categories = useState("categories", () => []);

  if (!categories?.value?.length) {
    const res = await api.categories.getAll({});

    categories.value = await res?.data;
  }

  return {
    categories,
  };
};
