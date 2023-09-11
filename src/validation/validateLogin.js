import validator from "validator";

const LoginValidation = (data) => {
  const errors = {};
  let isValid = true;

  if (validator.isEmpty(data.username)) {
    isValid = false;
    errors.username = "*Please Enter username";
  }
  if (validator.isEmpty(data.password)) {
    isValid = false;
    errors.password = "*Please Enter password";
  }

  return { errors, isValid };
};

export default LoginValidation;
