import { ValidationError } from "yup";

export function getErrors(validationError: ValidationError) {
  const objErrors: Record<string, string> = {};
  validationError.inner.forEach((error) => {
    if (error.path) {
      objErrors[error.path] = error.message;
    }
  });
  return objErrors;
}
