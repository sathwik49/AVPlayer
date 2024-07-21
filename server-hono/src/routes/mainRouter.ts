import { Hono } from "hono";
import userRouter from "./userRoute";
import file from "./getFiles";

const mainRouter = new Hono();

mainRouter.route('/user',userRouter)
//mainRouter.route('/getfile/:id',file)

export default mainRouter