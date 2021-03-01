const formatUser = (raw) => {
  const user = raw.dataValues;
  delete user.password;

  return user;
};

module.exports = {
  formatUser,
};
