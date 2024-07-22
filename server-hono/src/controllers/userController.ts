import { Context } from "hono";
import bcrypt from "bcryptjs";
import { userSignupValidation } from "../zod/schemaValidation";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { users } from "../db/schema";
import { config } from "dotenv";
import { Bindings } from "../bindings";
import { connectDB } from "../config/db";
import { eq } from "drizzle-orm";

config({ path: ".dev.vars" });
let db:NeonHttpDatabase<Record<string, never>>;

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
  db  = connectDB(c);

  try {
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
    const duplicateUserName = await db.select().from(users).where(eq(users.username,username))
    const duplicateEmail = await db.select().from(users).where(eq(users.email,email));
    
    if (duplicateUserName.length > 0) {
      return c.json(
        { message: "Username already exists", success: false },
        403
      );
    }
    if (duplicateEmail.length > 0) {
      return c.json(
        { message: "Email already used", success: false },
        403
      );
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
    return c.json({ message: error.stack, success: false }, 404);
  }
};
