import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from '../db/sequelize.js';

const { DataTypes } = Sequelize;

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('firstName', value.trim());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('lastName', value.trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      set(value) {
        this.setDataValue('email', value.trim().toLowerCase());
      },
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt for each new entry
  },
);

User.prototype.generateAuthToken = async function () {
  const user = this;
  const { id } = user;

  const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET);

  return token;
};

User.findByCredentials = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }
  return user;
};

User.beforeSave(async (userInstance) => {
  if (userInstance.changed('password')) {
    userInstance.password = await bcrypt.hash(userInstance.password, 8);
  }
});

export default User;
