import { Context } from "hono";
import bcrypt from "bcryptjs";
import {
  userLoginValidation,
  userSignupValidation,
} from "../zod/schemaValidation";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { users } from "../db/schema";
import { config } from "dotenv";
import { Bindings } from "../bindings";
import { connectDB } from "../config/db";
import { and, eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { setCookie, setSignedCookie } from "hono/cookie";

let db: NeonHttpDatabase<Record<string, never>>;

// const connectDB = async (c: Context<{ Bindings: Bindings }>) => {
//   try {
//     const DATABASE_URL = c.env.DATABASE_URL;

//     if (!DATABASE_URL) {
//       throw new Error("Error connecting to DB");
//     }
//     const sql = neon(DATABASE_URL);
//     db = drizzle(sql);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const userSignup = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    db = connectDB(c);
    if (!db) {
      return c.json({ message: "Internal Server Error" }, 500);
      //console.log("no db");
    }
    const { username, password, email, mobile } = await c.req.json();
    const inputValidation = userSignupValidation({
      username,
      password,
      email,
      mobile,
    });

    if (!inputValidation.success || inputValidation.errMessage) {
      return c.json(
        {
          message: inputValidation.message || inputValidation.errMessage,
          success: false,
        },
        403
      );
    }
    const duplicateUserName = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    const duplicateEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (duplicateUserName.length > 0) {
      return c.json(
        { message: "Username already exists", success: false },
        403
      );
    }
    if (duplicateEmail.length > 0) {
      return c.json({ message: "Email already used", success: false }, 403);
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await db.insert(users).values({
      username,
      password: hashedPwd,
      email,
      mobile,
    });
    if (newUser) {
      return c.json(
        { message: "User created successfully", success: true },
        201
      );
    }

    return c.json(
      { message: "Something went wrong. Try Again", success: false },
      500
    );
  } catch (error: any) {
    return c.json({ message: error.message, success: false }, 404);
  }
};

export const userLogin = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    db = connectDB(c);
    if (!db) {
      return c.json({ message: "Internal Server Error" }, 500);
      //console.log("no db");
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
          success: false,
        },
        403
      );
    }
    console.log("validation completed");

    const validUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    console.log("user found");
    if (!(validUsername.length > 0)) {
      return c.json({ message: "Username not found", success: false }, 403);
    }
    const validPassword = await bcrypt.compare(
      password,
      validUsername[0].password
    );
    if (!validPassword) {
      return c.json({ message: "Invalid Password", success: false }, 403);
    }
    console.log("password matched");

    const token = await sign(
      {
        username: validUsername[0].username,
        email: validUsername[0].email,
      },
      c.env.JWT_PASSWORD
    );
    console.log(token);

    setCookie(c, "jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    });
    console.log("cokkie done");

    return c.json({ message: "Login Successful", success: true }, 200);
  } catch (error: any) {
    console.log();
    
    return c.json({ message: error.message, success: false }, 404);
  }
};
