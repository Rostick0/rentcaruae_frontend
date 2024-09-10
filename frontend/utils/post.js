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

export const getSeoMeta = (post) => ({
  title: post?.title,
  ogTitle: post?.title,
  description: post?.short_description,
  ogDescription: post?.short_description,
  ogImage: post?.image?.image?.path_webp,
  ogImageWidth: post?.image?.image?.width,
  ogImageHeight: post?.image?.image?.height,
  ogType: "article",
});
