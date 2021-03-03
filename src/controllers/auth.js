import Sequelize from 'sequelize';
import { User } from '../models/index.js';
import { formatUser, err } from '../helpers/utils.js';

const { Op } = Sequelize;

/**
@api {post} /auth/signup Sign Up User
@apiVersion 1.0.0
@apiName SignUp
@apiGroup Auth

@apiParamExample {json} Request-Example:
{
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "email": "johnd@mail.com",
  "password": "12345aA!"
}

@apiSuccess {Object} user User details
@apiSuccess {String} token Auth token
@apiSuccessExample {json} Success-Response:
HTTP/1.1 201 Created
{
    "user": {
        "id": "218c2c56-0035-4819-bebb-ec9c11afb447",
        "firstName": "Juan",
        "lastName": "Dela Cruz",
        "email": "johnd@mail.com",
        "updatedAt": "2020-08-15T12:08:14.989Z",
        "createdAt": "2020-08-15T12:08:14.963Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxOGMyYzU2LTAwMzUtNDgxOS1iZWJiLWVjOWMxMWFmYjQ0NyIsImlhdCI6MTU5NzQ5MzI5NH0.6Zb9UbuQGJiqxiuXTm-31Q1KqqgNIOzYjQtUNMh1IyM"
}
*/

const signUp = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      throw err(400, 'Email already exists');
    }

    const newUser = new User(req.body);
    await newUser.save();

    const token = await newUser.generateAuthToken();

    return res.status(201).send({ user: formatUser(newUser), token });
  } catch (e) {
    console.log(e);

    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

/**
@api {post} /auth/login Log In User
@apiVersion 1.0.0
@apiName LogIn
@apiGroup Auth

@apiParamExample {json} Request-Example:
{
	 "email": "johnd@mail.com",
	 "password": "12345aA!"
}

@apiSuccess {Object} user User details
@apiSuccess {String} token Auth token
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{
    "user": {
        "id": "89193b8f-a62f-4d31-9e47-cb44b2dd3f5f",
        "firstName": "Juan",
        "lastName": "Dela Cruz",
        "email": "johnd@mail.com",
        "createdAt": "2020-08-15T11:55:57.000Z",
        "updatedAt": "2020-08-15T12:06:08.595Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5MTkzYjhmLWE2MmYtNGQzMS05ZTQ3LWNiNDRiMmRkM2Y1ZiIsImlhdCI6MTU5NzQ5MzE2OH0.Kj6zdkvhD0_7Bb9dvnJr9oK3pu5mbO-_4JokBQC9BlU"
}
*/

const logIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );

    if (user === null) {
      throw err(400, 'Invalid credentials');
    }

    const token = await user.generateAuthToken();

    return res.send({ user: formatUser(user), token });
  } catch (e) {
    console.log(e);

    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

/**
@api {put} /profile Edit Profile
@apiVersion 1.0.0
@apiName EditProfile
@apiGroup User

@apiHeader {String} Authorization Bearer token

@apiParam {String} [first_name] First name 
@apiParam {String} [last_name] Last name 
@apiParam {String} [email] Email Address 

@apiParamExample {json} Request-Example:
{
	"firstName": "John",
  "lastName": "Dela Cruz",
  "email": "johndlc@mail.com"
}

@apiSuccess {Object} user User details
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{
    "user": {
        "id": "8363ef66-2e60-4991-8f80-1a4e05b03548",
        "firstName": "Juan",
        "lastName": "Dela Cruz",
        "email": "johndlc@mail.com",
        "createdAt": "2020-08-17T11:15:19.000Z",
        "updatedAt": "2020-08-17T11:19:26.306Z"
    }
}
*/

const editProfile = async (req, res) => {
  const allowedUpdates = ['firstName', 'lastName', 'email'];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  ); // only returns true if all conditions are satisfied

  if (!isValidOperation) {
    throw err(400, 'Invalid updates');
  }

  try {
    if (req.body.email) {
      // search emails except own email
      const duplicate = await User.findOne({
        where: {
          email: req.body.email,
          id: { [Op.ne]: req.user.id },
        },
      });

      if (duplicate) {
        throw err(400, `Email already exists`);
      }
    }

    updates.map((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    return res.send({ user: formatUser(req.user) });
  } catch (e) {
    console.log(e);

    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const authController = {
  logIn,
  signUp,
  editProfile,
};

export default authController;
