import { Context } from "hono";
import Bindings from "./Bindings";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

export const generateAndSetCookie = async (c: Context<{ Bindings: Bindings }>,userId:string,username:string) => {
    try {
        const token = await sign({
            userId,
            username
        }, c.env.JWT_SECRET)
        setCookie(c,'jwt',token,{
            maxAge:7*24*60*60,
            httpOnly:true,
            secure:c.env.NODE_ENV==="production"
        }) 
        return {message:"Token set",success:true};
    } catch (error:any) {
        return {message:"Error Occured.Try to Login or Please try later.",success:false}
    }
}