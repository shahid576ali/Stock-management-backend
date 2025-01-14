import express from 'express';
import { signUp, signIn, userDetails, verifyToken } from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.post('/signin', signIn);
userRouter.post('/signup', signUp);
userRouter.get('/details',verifyToken, userDetails);

export default userRouter;
