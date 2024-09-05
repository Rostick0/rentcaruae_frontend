export const getGenerationOnSubmitValues = ({ name, model_car_id }) => ({
  name: name?.id,
  model_car_id: model_car_id?.id,
});

export const generationsType = [
  "Coupe",
  "Roadster",
  "Hatchback",
  "SUV",
  "Wagon",
  "Cabrio",
  "Targa",
  "Liftback",
  "Minivan",
  "Speedster",
  "Limousine",
  "Fastback",
  "Pickup",
  "Van",
];

export const generationsTypeOptions = generationsType.map((item) => ({
  id: item,
  name: item,
}));
