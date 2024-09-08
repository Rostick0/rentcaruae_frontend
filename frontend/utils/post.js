import useImage from "~/composables/useImage";

export const getPostOnSubmitValues = async ({
  image,
  car_id,
  post_category_id,
  ...values
}) => {
  const { getImageFrom } = useImage();

  const image_id = await getImageFrom(image).then((res) => res?.id);

  return {
    ...values,
    image: image_id,
    car_id: car_id?.id,
    post_category_id: post_category_id?.id,
  };
};
