import { Hono } from "hono";
import authRouter from "./authRoute";
import songsRoute from "./songsRoute";

const mainRouter = new Hono()

mainRouter.route('/auth',authRouter)
mainRouter.route('/songs',songsRoute)


export default mainRouter