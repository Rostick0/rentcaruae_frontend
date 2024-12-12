export const getMessagesValidate = (t) => ({
  messages: {
    required: t("form.required"),
    email: t("form.email"),
    // interpolates the min, max params
    between: "The {field} value must be between 0:{min}, 1:{max}",
    // interpolates the min, max params
    min: "The {field} must be at least 0:{min} characters",
    max: "The {field} must not be greater than 0:{max} characters",
    // Interpolates another field value in the form
    confirmed: "The {field} value must match {age}",
    size: "The {field} size must be less than {size} KB",
    image: "The {field} field must be an image",
    min_value: "The {field} must be greater than or equal to 0:{min}",
    max_value: "The {field} must be less than 0:{max_value}",
  },
});
