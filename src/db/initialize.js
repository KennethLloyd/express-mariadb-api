import mariadb from 'mariadb';
import sequelize from './sequelize.js';

const initializeDB = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mariadb.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); // update schema
};

export default initializeDB;
