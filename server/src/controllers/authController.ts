import { Context } from "hono";
import connectDB from "../config/db";
import Bindings from "../utils/Bindings";
import {
  userLoginValidation,
  userSignupValidation,
} from "../zod/userAuthValidation";
import bcryptjs from "bcryptjs";
import { generateAndSetCookie } from "../utils/generateAndSetCookie";
import { deleteCookie, getCookie } from "hono/cookie";
import { decode } from "hono/jwt";

export const userSignup = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const prisma = await connectDB(c);
    if (!prisma) {
      return c.json({ message: "Internal Server Error",details:null,success: false }, 500);
    }
    const { email, username, password } = await c.req.json();
    const inputValidation = userSignupValidation({
      username,
      password,
      email,
    });

    if (!inputValidation.success || inputValidation.errMessage) {
      return c.json(
        {
          message: inputValidation.message || inputValidation.errMessage,
          details:null,
          success: false,
        },
        403
      );
    }

    const duplicateEmail = await prisma.user.findFirst({where:{email}});
    if (duplicateEmail)
      return c.json({ message: "Email Already in use",details:null, success: false }, 401);

    const duplicateUser = await prisma.user.findFirst({ where: { username } });
    if (duplicateUser)
      return c.json({ message: "Username Already taken",details:null, success: false }, 401);

    const hashedPwd = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPwd,
        email,
      },
      select: {
        userId: true,
        username: true,
      },
    });
    if (user) {
      const tokenMsg = await generateAndSetCookie(c, user.userId, user.username);
      if(!tokenMsg.success){
          return c.json({message:tokenMsg.message,details:null,success:tokenMsg.success},400)
      }
      return c.json(
        {
          message:'Signup successfull' ,
          details:{ userId: user.userId, username: user.username },
          success: true,
        },
        201
      );
    }
    return c.json({ message: "Internal Server Error",details:null, success: false }, 500);
  } catch (error: any) {
    return c.json({ message: "Internal Server Error",details:null, success: false }, 500);
  }
};

export const userLogin = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const prisma = await connectDB(c);
    if (!prisma) {
      return c.json({ message: "Internal Server Error",details:null, success: false }, 500);
    }
    const { username, password } = await c.req.json();
    const inputValidation = userLoginValidation({
      username,
      password,
    });

    if (!inputValidation.success || inputValidation.errMessage) {
      return c.json(
        {
          message: inputValidation.message || inputValidation.errMessage,
          details:null,
          success: false,
        },
        403
      );
    }

    const validUser = await prisma.user.findFirst({ where: { username } });
    if (!validUser) {
      return c.json({ message: "Username not found",details:null, success: false }, 403);
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return c.json({ message: "Invalid Password",details:null, success: false }, 403);
    }

    const tokenMsg = await generateAndSetCookie(
      c,
      validUser.userId,
      validUser.username
    );
    // if(!tokenMsg.success){
    //     return c.json({message:tokenMsg.message,details:null,success:tokenMsg.success},400)
    // }

    return c.json(
      {
        message:"Login Successfull" ,
        details:{ userId: validUser.userId, username: validUser.username },
        success: true,
      },
      200
    );
  } catch (error: any) {
    return c.json({ message: "Internal Server Error",details:null, success: false }, 500);
  }
};

export const userLogout = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    deleteCookie(c, "jwt", {
      maxAge: 0,
    });
    return c.json({ message: "Logged Out",details:null, success: true }, 200);
  } catch (error: any) {
    return c.json({ message: "Internal Server Error",details:null, success: false }, 500);
  }
};

export const getUser = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    //user - {userId,username}

    // If auth-middleware not used
    const token = getCookie(c,'jwt');
    if(!token){
        return c.json({message:"Please Login or Signup.",details:null,success:false},403)
    }
    const user = decode(token).payload

    // If auth-middleware used
    // const user = c.get("jwtPayload");
    // if (!user) {
    //   return c.json(
    //     { message: "Please Login or Signup.",details:null, success: false },
    //     403
    //   );
    // }
    return c.json({ message:"User found" ,details:user, success: true }, 200);
  } catch (error: any) {
    return c.json({ message: "Internal Server Error",details:null, success: false }, 500);
  }
};
