import useImage from "~/composables/useImage";

export const carFullExtends = [
  "generation.model_car.brand",
  "car_options.option",
  "images.image",
  "category",
  "fuel_type",
  "security_deposit",
  "free_per_day_security",
  "transmission",
  "colour",
  "colour_interior",
  "price",
  "price_leasing",
  "price_special",
].join();

export const getCarOnSubmitValues = async ({
  brand,
  model_car,
  category_id,
  colour_id,
  colour_interior_id,
  fuel_type_id,
  generation_id,
  transmission_id,
  ...values
}) => {
  const { getImageIdsFrom } = useImage();

  const images = await getImageIdsFrom(values?.images);

  return {
    ...values,
    images,
    category_id: category_id?.id,
    colour_id: colour_id?.id,
    colour_interior_id: colour_interior_id?.id,
    fuel_type_id: fuel_type_id?.id,
    generation_id: generation_id?.id,
    transmission_id: transmission_id?.id,
  };
};
