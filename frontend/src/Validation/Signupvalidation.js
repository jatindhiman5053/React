function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }

  if (values.name === "") {
    error.name = "name should not be empty";
  } else {
    error.name = "";
  }

  if (values.password === "") {
    error.password = "password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password Didn't match";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
