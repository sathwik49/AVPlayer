import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { Context } from "hono";
import { Bindings } from "../bindings";

config({ path: ".dev.vars" });

export const connectDB = (c: Context<{ Bindings: Bindings }>) => {
  const DATABASE_URL = c.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("Error connecting to DB/Interna");
  }
  const sql = neon(DATABASE_URL);
  const db: NeonHttpDatabase<Record<string, never>> = drizzle(sql);
  return db;
};
