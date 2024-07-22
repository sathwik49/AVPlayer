import { Context, Hono } from "hono";
import { userLogin, userSignup } from "../controllers/userController";
import { userLoginAuth } from "../middleware/userAuthMiddleware";

const userRouter = new Hono();

userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)

userRouter.use(userLoginAuth)

//userRouter.get('/songs')

userRouter.get('/abc',async (c:Context)=>{
    return c.text("hi"+c.get('username'))
})

export default userRouter