import { Hono } from "hono";
import { userSignup } from "../controllers/userController";

const userRouter = new Hono();

userRouter.post('/signup',userSignup)

export default userRouter