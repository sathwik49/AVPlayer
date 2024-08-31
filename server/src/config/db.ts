import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import Bindings from "../utils/Bindings";

const connectDB = async (c:Context<{Bindings:Bindings}>) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    return prisma;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

export default connectDB;
