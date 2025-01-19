import express from 'express';
import { signUp, signIn, userDetails } from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.post('/signin', signIn);
userRouter.post('/signup', signUp);
userRouter.get('/details', userDetails);

export default userRouter;
