export const invalidValuesForm = () => {
  warningPopup("Не все поля валидные");
};

export const errorMessage = (message, errors, setErrors) => {
  warningPopup(message);
  if (errors) setErrors(errors);
};
