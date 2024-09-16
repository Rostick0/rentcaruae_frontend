// import api from "~/api";

export default async () => {
  const generations = useState("generations", () => bodyTypesWithIcon);

  return {
    generations,
  };
};
