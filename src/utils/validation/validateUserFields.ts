import * as yup from "yup";

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .optional()
    .min(2, "Name must contain at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

export async function validateUserFields(
  userName: string | undefined,
  email: string,
  password: string
) {
  try {
    await validationSchema.validate(
      { userName, email, password },
      { abortEarly: false }
    );
    return true;
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      throw validationError;
    }
  }
}
