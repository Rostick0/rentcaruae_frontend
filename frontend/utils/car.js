import useImage from "~/composables/useImage";
import lastItem from "lodash/last";

export const carFullExtends = [
  "generation.model_car.brand",
  "car_options.option",
  "images.image",
  "car_categories.category",
  "fuel_type",
  "security_deposit",
  "free_per_day_security",
  "transmission",
  "colour",
  "colour_interior",
  "price",
  "price_leasing",
  "price_special",
  "user.company.image.image",
].join();

export const getCarOnSubmitValues = async ({
  brand,
  model_car,
  car_categories,
  colour_id,
  colour_interior_id,
  fuel_type_id,
  generation_id,
  cities,
  transmission_id,
  min_days,
  price_leasing,
  mileage_leasing,
  price_sum,
  price_mileage,
  security_deposit,
  free_per_day_security,
  price_special,
  car_options,
  ...values
}) => {
  const { getImageIdsFrom } = useImage();

  const images = await getImageIdsFrom(values?.images);

  return {
    ...values,
    images,
    cities: cities?.map?.((item) => item?.id)?.join(","),
    // category_id: category_id?.id,
    car_categories: car_categories?.map?.((item) => item?.id)?.join(","),
    colour_id: colour_id?.id,
    colour_interior_id: colour_interior_id?.id,
    fuel_type_id: fuel_type_id?.id,
    generation_id: generation_id?.id,
    transmission_id: transmission_id?.id,
    min_days: min_days?.id,
    price_leasing: price_leasing?.map((item) => removeSpaces(item)) ?? null,
    mileage_leasing: mileage_leasing?.map((item) => removeSpaces(item)) ?? null,
    price_sum: price_sum?.map((item) => removeSpaces(item)),
    price_mileage: price_mileage?.map((item) => removeSpaces(item)),
    security_deposit: removeSpaces(security_deposit),
    free_per_day_security: removeSpaces(free_per_day_security),
    price_special: price_special?.map((item) => removeSpaces(item)) ?? null,
    car_options: car_options?.join(),
  };
};

export const getPriceRefreshCars = (user, val) => {
  // if (user?.refresh_car?.max > 35) return val * 10;

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

  if (newV?.price_special?.length !== data?.price_special?.length) {
    // при true, нужно чтоб массив не был пустым
    data.price_special = newV.price_special;
  }

  if (newV?.transmission_id?.id !== data?.transmission?.id) {
    data.transmission = newV?.transmission_id;
  }

  if (newV?.fuel_type_id?.id !== data?.fuel_type?.id) {
    data.fuel_type = newV?.fuel_type_id;
  }

  if (newV?.seats != data?.seats) {
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

export const getCarSeo = (car, isLeasing) => {
  return isLeasing
    ? {
        title: `Lease ${car?.title} in Dubai at AED ${formatNumber(
          lastItem(car?.price_leasing)?.price
        )}/month`,
        description: `Lease a ${car?.title} at RentcarUAE for long term basis in ${car?.user?.company?.city?.name}.We feature quality vehicles for all occasions, including luxury cars, sports cars, and economy models.`,
        h1: `Monthly rental ${car?.generation?.model_car?.name} in ${car?.user?.company?.city?.name}`,
      }
    : {
        title: `Rent ${car?.generation?.model_car?.name} in ${car?.user?.company?.city?.name}, UAE at AED ${car?.price?.[0]?.price}/day & AED ${car?.price?.[2]?.price}/month `,
        description: `Rent ${car?.title} in ${car?.user?.company?.city?.name}, UAE for AED ${car?.price?.[0]?.price}/day & AED ${car?.price?.[2]?.price}/month.`,
        h1: `Rent ${car?.title} in ${car?.user?.company?.city?.name}`,
      };
};

export const getWhatsappText = (car, isLeasing = false) =>
  `I would like to ${isLeasing ? "lease" : "rent"} ${
    car?.generation?.model_car?.brand?.name
  } ${car?.generation?.model_car?.name} advertised on rentcaruae.com`;

export const getCarImageTitle = (car, city) =>
  `${car?.title} ${car?.year} for rent in ${city?.name}`;
export const getCarImageAlt = (car, city) =>
  `Rent ${car?.title} in ${city?.name}`;
