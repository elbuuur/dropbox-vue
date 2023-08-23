import * as yup from "yup";

const yupFields = {
  user_name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must contain at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  folder_name: yup
    .string()
    .required("Folder name is required")
    .min(2, "Folder name must be at least 2 characters"),
  file_name: yup
    .string()
    .required("File name is required")
    .min(3, "File name must be at least 3 characters"),
};

const validationSchema = yup.object().shape(yupFields);

export const validateFields = async (
  data: Partial<Record<keyof typeof yupFields, string | undefined>>
) => {
  try {
    const fieldsName = Object.keys(data) as (keyof typeof yupFields)[];
    await validationSchema
      .pick(fieldsName)
      .validate(data, { abortEarly: false });
    return true;
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      throw validationError;
    }
  }
};
