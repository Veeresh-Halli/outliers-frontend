import validator from "validator";

const registerValidation = (data) => {
  const errors = {};
  let isValid = true;

  const userRegex = /^[\w.@+\-]{1,150}$/;
  const checkUpperCase = /[A-Z]/;
  const checkLowerCase = /[a-z]/;
  const checkNumber = /[0-9]/;

  if (!userRegex.test(data.username)) {
    isValid = false;
    errors.username =
      "*Accepts 150 characters or fewer. Letters, digits, and @/./+/-/_ only.";
  }

  if (validator.isEmpty(data.username)) {
    isValid = false;
    errors.username = "*Please Enter username";
  }

  if (
    !checkNumber.test(data.password) ||
    !checkUpperCase.test(data.password) ||
    !checkLowerCase.test(data.password)
  ) {
    isValid = false;
    errors.password =
      "*Password should conatin atleast one lowercase, upper case and number.";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    isValid = false;
    errors.password = "*Password should contain atleast contain 8 characters.";
  }

  if (validator.isEmpty(data.password)) {
    isValid = false;
    errors.password = "*Please Enter password";
  }
  return { errors, isValid };
};

export default registerValidation;
