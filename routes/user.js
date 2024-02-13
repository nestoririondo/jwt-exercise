import express from 'express';
import { loginUser, createUser, connectUser, checkJWT } from '../controllers/user.js';
import { checkUserDoesNotExist, checkUserExists, authorize } from '../middlewares/user.js';

const userRouter = express.Router();

userRouter.get('/login', loginUser);
userRouter.post('/createUser', checkUserDoesNotExist, createUser)
userRouter.post('/connect', checkUserExists, connectUser);
userRouter.post('/checkJWT', authorize, checkJWT)

export default userRouter;