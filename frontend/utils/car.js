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
  price_leasing,
  mileage_leasing,
  price_sum,
  price_mileage,
  security_deposit,
  free_per_day_security,
  price_special,
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
    price_leasing: price_leasing?.map((item) => removeSpaces(item)),
    mileage_leasing: mileage_leasing?.map((item) => removeSpaces(item)),
    price_sum: price_sum?.map((item) => removeSpaces(item)),
    price_mileage: price_mileage?.map((item) => removeSpaces(item)),
    security_deposit: removeSpaces(security_deposit),
    free_per_day_security: removeSpaces(free_per_day_security),
    price_special: price_special?.map((item) => removeSpaces(item)),
  };
};

export const getPriceRefreshCars = (user, val) => {
  if (user?.refresh_car?.max > 35) return val * 10;

  if (user?.refresh_car?.count - val < 0)
    return (val - user?.refresh_car?.count) * 10;

  return 0;
};

export const updateCarShow = (newV, prev) => {
  const data = prev;

  if (newV?.model_car?.id !== data?.model_car?.id) {
    data.generation = {
      model_car: newV?.model_car,
    };
    data.title = `${newV?.model_car?.brand?.name} ${newV?.model_car?.name}`;
  }

  if (newV?.is_new !== data?.is_new) {
    data.is_new = newV.is_new;
  }

  if (newV?.price_leasing?.length !== data?.price_leasing?.length) {
    // при true, нужно чтоб массив не был пустым
    data.price_special = newV.price_leasing;
  }

  if (newV?.transmission_id?.id !== data?.transmission?.id) {
    data.transmission = newV?.transmission_id;
  }

  if (newV?.seats !== data?.seats) {
    data.seats = newV?.seats;
  }

  if (
    newV?.price_mileage?.[0] !== data.price[0]?.mileage ||
    newV?.price_sum?.[0] !== data.price[0]?.price
  ) {
    data.price[0] = {
      price: newV?.price_sum?.[0],
      mileage: newV?.price_mileage?.[0],
    };
  }

  if (
    newV?.price_mileage?.[2] !== data.price[2]?.mileage ||
    newV?.price_sum?.[2] !== data.price[2]?.price
  ) {
    data.price[2] = {
      price: newV?.price_sum?.[2],
      mileage: newV?.price_mileage?.[2],
    };
  }

  if (newV?.security_deposit !== data?.security_deposit?.price) {
    data.security_deposit = { price: newV?.security_deposit };
  }

  if (newV?.min_days !== data?.min_days?.value) {
    data.min_days = newV?.min_days?.value;
  }

  if (newV?.images?.[0]?.id !== data?.images?.[0]?.id) {
    data.images = [{ image: { path_webp: newV?.images[0]?.path } }];
  }

  return data;
};
