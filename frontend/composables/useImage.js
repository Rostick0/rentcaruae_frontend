// import { useToast } from "vue-toastification";
import api from "~/api";

export default () => {
  const createImage = async (image) => {
    const formData = new FormData();

    formData.append("image", image);

    const response = await api.image.create({
      data: formData,
    });

    return await response.data;
  };

  const createImages = async (images) => {
    let data = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i]?.file) {
        try {
          const image = await createImage(images[i]?.file);
          data.push(image.id);
        } catch (e) {
          warningPopup(`Image dont upload: ${images[i]?.name}`);
        }
      }
    }

    return data;
  };

  const getImageParamFrom = async (image, param = "id") => {
    if (typeof image !== "string") {
      const resp = await createImage(image).then((resp) => resp[param]);

      if (resp?.error) {
        warningPopup("Image dont upload");
      }
    }
    return image;
  };

  const getImageIdsFrom = async (images) => {
    const newIds = await createImages(images);
    const idsOld = images?.filter?.((i) => !i?.file)?.map((item) => item?.id);

    return [...idsOld, ...newIds].join();
  };

  return {
    createImage,
    createImages,
    getImageParamFrom,
    getImageIdsFrom,
  };
};