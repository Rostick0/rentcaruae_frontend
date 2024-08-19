import { v4 } from "uuid";
import api from "~/api";

export default () => {
  const viewKey = useCookie("viewKey");

  if (!viewKey.value) {
    viewKey.value = v4();
  }

  const create = async (carId) =>
    await api.views.create({
      data: {
        user_key: viewKey.value,
        car_id: carId,
      },
    });

  return {
    create,
  };
};
