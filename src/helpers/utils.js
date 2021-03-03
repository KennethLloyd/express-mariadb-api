const formatUser = (raw) => {
  const user = raw.dataValues;
  delete user.password;

  return user;
};

const err = (statusCode, message) => {
  const error = new Error(message);
  error.status = statusCode;

  return error;
};

export { formatUser, err };
