import { Sequelize } from 'sequelize';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(`mariadb://${DB_HOST}/${DB_NAME}`, {
  username: DB_USER,
  password: DB_PASSWORD,
  dialectOptions: {
    timezone: 'Etc/GMT+8',
  },
  logging: false,
});

export default sequelize;
