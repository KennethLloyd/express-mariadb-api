import authRouter from './auth.js';

const initializeRouter = (app) => {
  app.use('/api', authRouter);
};

export default initializeRouter;
