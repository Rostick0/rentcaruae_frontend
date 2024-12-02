export const bodyTypesWithIcon = [
  {
    name: "SUV",
    img: "/frontend-images/car-type/SUV.png",
  },
  {
    name: "VAN",
    img: "/frontend-images/car-type/VAN.png",
  },
  {
    name: "Sedan",
    img: "/frontend-images/car-type/Sedan.png",
  },
  {
    name: "Coupe",
    img: "/frontend-images/car-type/Coupe.png",
  },
  {
    name: "Cabrio",
    img: "/frontend-images/car-type/Cabrio.png",
  },
  {
    name: "Hatchback",
    img: "/frontend-images/car-type/Hatchback.png",
  },
  {
    name: "Liftback",
    img: "/frontend-images/car-type/Liftback.png",
  },
];

export const getBodyImages = async (generations) => {
  const data = [];

  generations.data?.forEach((item) => {
    const findedGeneration = bodyTypesWithIcon.find(
      (el) => el?.name?.toLowerCase() == item?.name?.toLowerCase()
    );

    if (!findedGeneration) return;

    data.push(findedGeneration);
  });

  return data;
};
