export const getPostOnSubmitValues = async ({ name, model_car_id }) => {
  return {
    name: name?.id,
    model_car_id: model_car_id?.id,
  };
};
