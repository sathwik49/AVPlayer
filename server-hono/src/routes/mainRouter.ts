import { Hono } from "hono";
import userRouter from "./userRoute";

const mainRouter = new Hono();

mainRouter.route('/user',userRouter)

export default mainRouter