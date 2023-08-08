import { array, ValidationError } from "yup";

export function getValidationErrors(validationError: ValidationError) {
  const objErrors: Record<string, string> = {};
  validationError.inner.forEach((error) => {
    if (error.path) {
      objErrors[error.path] = error.message;
    }
  });
  return objErrors;
}

export function getErrorsFromResponse(errors: Array<string>) {
  const objErrors: Record<string, string> = {};

  for (const errorType in errors) {
    objErrors[errorType] = errors[errorType][0];
  }

  return objErrors;
}
