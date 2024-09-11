export const errorMessage = (message, errors, setErrors) => {
  warningPopup(message);
  if (errors) setErrors(errors);
};
