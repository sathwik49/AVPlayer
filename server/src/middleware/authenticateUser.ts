import { Context } from "hono";
import Bindings from "../utils/Bindings";
import { getCookie } from "hono/cookie";
import { decode, verify } from "hono/jwt";
import { Variables } from "../utils/Variables";

export const authenticateUser = async (c: Context<{ Bindings: Bindings;Variables:Variables }>, next: () => Promise<void>) => {
  try {
    const token = getCookie(c, 'jwt');
    if (!token) {
      return c.json({ message: "Unauthorized.Please Login or Signup first.", success: false }, 401);
    }

    const validToken = await verify(token, c.env.JWT_SECRET);
    if (!validToken) {
      return c.json({ message: "Unauthorized.Please try to Login again.", success: false }, 401);
    }

    const user = decode(token);
    c.set('jwtPayload', user.payload);

    await next();

  } catch (error: any) {
    return c.json({ message: "Internal Server Error", success: false }, 500);
  }
};
