// import api from "~/api";

export default async () => {
  const generations = useState("generations", () => [
    {
      name: "SUV",
      img: "images/car-type/SUV.png",
    },
    {
      name: "VAN",
      img: "images/car-type/VAN.png",
    },
    {
      name: "Sedan",
      img: "images/car-type/Sedan.png",
    },
    {
      name: "Coupe",
      img: "images/car-type/Coupe.png",
    },
    {
      name: "Cabrio",
      img: "images/car-type/Cabrio.png",
    },
    {
      name: "Hatchback",
      img: "images/car-type/Hatchback.png",
    },
    {
      name: "Liftback",
      img: "images/car-type/Liftback.png",
    },
  ]);

  // if (!generations?.value?.length) {
  //   // const res = await api.distinctValue.getAll({
  //   //   params: {
  //   //     table: "generations",
  //   //     column: "name",
  //   //     sort: "-name",
  //   //     limit: 8,
  //   //   },
  //   // });

  //   generations.value = await res?.data;
  // }

  return {
    generations,
  };
};
