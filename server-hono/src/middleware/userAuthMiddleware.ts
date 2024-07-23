import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { connectDB } from "../config/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { Bindings } from "../bindings";

let db: NeonHttpDatabase<Record<string, never>>;

export const userLoginAuth = async (c: Context, next: Next) => {
  try {
    db = connectDB(c);
    
    
    if (!db) {
      return c.json({ error: 'Database connection failed' }, 500);
    }

    const cookie = getCookie(c, 'jwt');

    if (!cookie) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const privateKey = c.env.JWT_PASSWORD;
    const decodedUser = await verify(cookie, privateKey);

    if (!decodedUser) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const decodedUserName = decodedUser.username as string;

    const foundUser = await db.select().from(users).where(eq(users.username, decodedUserName));

    if (foundUser.length === 0) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    // Set custom property
    //c.set('username', foundUser[0].username);
    c.set('username', foundUser[0].username);
    

    await next();
  } catch (error: any) {
    console.error(error);
    return c.json({ message: "Unauthorized" }, 403);
  }
}
