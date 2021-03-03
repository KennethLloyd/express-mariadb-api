import Joi from 'joi';

const signUp = async (req, res, next) => {
  const bodySchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  try {
    const body = await bodySchema.validateAsync(req.body);
    req.body = body;

    return next();
  } catch (err) {
    return res.status(400).send({
      error: err.details[0].message,
    });
  }
};

const logIn = async (req, res, next) => {
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    const body = await bodySchema.validateAsync(req.body);
    req.body = body;

    return next();
  } catch (err) {
    return res.status(400).send({
      error: err.details[0].message,
    });
  }
};

const editProfile = async (req, res, next) => {
  const bodySchema = Joi.object({
    firstName: Joi.string().empty(''),
    lastName: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
  });

  try {
    const body = await bodySchema.validateAsync(req.body);
    req.body = body;

    return next();
  } catch (err) {
    return res.status(400).send({
      error: err.details[0].message,
    });
  }
};

const authValidator = {
  signUp,
  logIn,
  editProfile,
};

export default authValidator;
