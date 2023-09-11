import validator from "validator";

const TaskValidation = (data) => {
  const errors = {};
  let isValid = true;

  const allowedRegex = /^[a-zA-Z0-9\,\.\s]*$/;

  if (!validator.isLength(data.title, { min: 0, max: 50 })) {
    isValid = false;
    errors.title = "*Title should be less than 50 characters";
  }

  if (!allowedRegex.test(data.title)) {
    isValid = false;
    errors.title = "*No special characters are allowed.";
  }

  if (validator.isEmpty(data.title)) {
    isValid = false;
    errors.title = "*Please Enter title.";
  }

  if (!validator.isLength(data.description, { min: 0, max: 2000 })) {
    isValid = false;
    errors.description = "*Description should be less than 2000 characters";
  }

  if (!allowedRegex.test(data.description)) {
    isValid = false;
    errors.description = "*No special characters are allowed.";
  }

  if (validator.isEmpty(data.description)) {
    isValid = false;
    errors.description = "*Please Enter description.";
  }

  return { errors, isValid };
};

export default TaskValidation;
