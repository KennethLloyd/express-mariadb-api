import authRouter from './auth.js';

export default (app) => {
  app.use(authRouter);
};
