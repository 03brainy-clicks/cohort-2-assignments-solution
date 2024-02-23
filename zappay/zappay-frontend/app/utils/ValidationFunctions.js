export const validateUsername = (username) => {
  return username.length > 3 && username.length < 20;
};

// Validation function
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  return name.length >= 3 && name.length < 20;
};
