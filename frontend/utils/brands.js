import useImage from "~/composables/useImage";

export const getBrandOnSubmitValues = async ({ image, ...values }) => {
  const { getImageFrom } = useImage();

  const image_url = await getImageFrom(image).then((res) => res?.path_webp);

  return {
    ...values,
    image_url,
  };
};
