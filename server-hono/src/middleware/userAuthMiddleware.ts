import { Hono } from "hono";
import { Context } from "hono";
import { Bindings } from "../bindings";
import { getCookie } from "hono/cookie";
import { decode, verify } from "hono/jwt";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { connectDB } from "../config/db";
import { users } from "../db/schema";
import { eq, sql } from "drizzle-orm";

let db:NeonHttpDatabase<Record<string, never>>;

export const userLoginAuth = async (c: Context,next : ()=> Promise<void>)=>{
    try {
    db = connectDB(c);

    const cookie = getCookie(c,'jwt');
    
    if(!cookie){
        return c.json({error: 'Unauthorized'},401);
    }
    const privateKey = c.env.JWT_PASSWORD;
    const decodedUser = await verify(cookie,privateKey);
    
    if(!decodedUser){
        return c.json({error: 'Unauthorized'},401);
    }
    const decodedUserName:any = decodedUser.username
    
    const foundUser= await db.select().from(users).where(eq(users.username,decodedUserName))
    if(!(foundUser.length > 0)){
        return c.json({error: 'Unauthorized'},403);
    }
    c.set("username",foundUser[0].username)
    
    await next();
    } catch (error:any) {
        return c.json({message:"UnAuthorized"},403)
    }
}