import { Context } from "hono";
import Bindings from "../utils/Bindings";
import { getCookie } from "hono/cookie";
import { decode, verify } from "hono/jwt";
import connectDB from "../config/db";

export const authenticateUser = async (c: Context<{ Bindings: Bindings}>, next: () => Promise<void>) => {
  try {
    const token = getCookie(c, 'jwt');
    if (!token) {
      return c.json({ message: "Unauthorized.Please Login or Signup first.", success: false }, 403);
    }

    const validToken = await verify(token, c.env.JWT_SECRET);
    if (!validToken) {
      return c.json({ message: "Unauthorized.", success: false }, 403);
    }

    const user = decode(token);
    const userId = user.payload.userId  as string;

    const prisma = await connectDB(c);
    if (!prisma) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }
    const foundUser = await prisma.user.findFirst({where:{userId:userId}})
    if(!foundUser){
      return c.json({ message: "Unauthorized.", success: false }, 403);
    }
    
    c.set('jwtPayload', user.payload);

    await next();

  } catch (error: any) {
    return c.json({ message: "Internal Server Error", success: false }, 500);
  }
};
