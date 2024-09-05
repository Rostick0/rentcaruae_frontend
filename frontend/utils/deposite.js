export const getDepositeOnSubmitValues = ({
  price,
  free_leads,
  prices_leads,
  ...values
}) => ({
  ...values,
  price: removeSpaces(price),
  free_leads: removeSpaces(free_leads),
  prices_leads: prices_leads?.map((item) => removeSpaces(item)) ?? null,
});
