export const getModelCarOnSubmitValues = ({ brand_id, ...values }) => ({
  ...values,
  brand_id: brand_id?.id,
});
