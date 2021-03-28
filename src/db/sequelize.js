import { Sequelize } from 'sequelize';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(`mysql://${DB_HOST}/${DB_NAME}`, {
  username: DB_USER,
  password: DB_PASSWORD,
  dialectOptions: {
    timezone: 'local',
  },
  logging: false,
});

export default sequelize;
