import express from 'express';
import authController from '@controllers/auth/index';
import validateToken from '@middlewares/protectedRoute.middleware';

const authRouter = express.Router();

authRouter.post('/login', authController.signIn);
authRouter.post('/signup', validateToken, authController.signUp);

export default authRouter;
