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

export const getPostSchema = (post) => ({
  innerHTML: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post?.title,
    image: [post?.image?.image?.path_webp],
    datePublished: post?.created_at,
    datePublished: post?.updated_at,
    description: post?.short_description,
    author: {
      "@type": "Person",
      name: post?.user?.full_name,
    },
  }),
  type: "application/ld+json",
});

export const getPostSeoMeta = (post) => ({
  title: post?.title,
  ogTitle: post?.title,
  description: post?.short_description,
  ogDescription: post?.short_description,
  ogImage: post?.image?.image?.path_webp,
  ogImageWidth: post?.image?.image?.width,
  ogImageHeight: post?.image?.image?.height,
  ogType: "article",
});
