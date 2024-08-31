import { Hono } from "hono";
import { userLogout, userLogin, userSignup, getUser } from "../controllers/authController";
import { authenticateUser } from "../middleware/authenticateUser";

const authRouter = new Hono()

authRouter.get('/me',getUser)
authRouter.post('/signup',userSignup)
authRouter.post('/login',userLogin)
authRouter.post('/logout',userLogout)

export default authRouter