// import api from "~/api";

export default async () => {
  const generations = useState("generations", () => [
    {
      name: "SUV",
      img: "images-frontend/car-type/SUV.png",
    },
    {
      name: "VAN",
      img: "images-frontend/car-type/VAN.png",
    },
    {
      name: "Sedan",
      img: "images-frontend/car-type/Sedan.png",
    },
    {
      name: "Coupe",
      img: "images-frontend/car-type/Coupe.png",
    },
    {
      name: "Cabrio",
      img: "images-frontend/car-type/Cabrio.png",
    },
    {
      name: "Hatchback",
      img: "images-frontend/car-type/Hatchback.png",
    },
    {
      name: "Liftback",
      img: "images-frontend/car-type/Liftback.png",
    },
  ]);

  return {
    generations,
  };
};
