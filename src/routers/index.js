import authRouter from './auth.js';

const initializeRouter = (app) => {
  app.use(authRouter);
};

export default initializeRouter;
