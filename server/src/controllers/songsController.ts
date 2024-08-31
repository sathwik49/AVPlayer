import { Context } from "hono";
import connectDB from "../config/db";
import Bindings from "../utils/Bindings";


export const addSong = async (c: Context<{ Bindings: Bindings }>) => {
    try {
      const prisma = await connectDB(c);
      if (!prisma) {
        return c.json({ message: "Internal Server Error", success: false }, 500);
      }
      const { songName,songDesc,songFile } = await c.req.parseBody({dot:true})
      
    } catch (error: any) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }
};


export const getAllSongs = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const prisma = await connectDB(c);
    if (!prisma) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }
    const jwtPayload = c.get("jwtPayload");
    const userId = jwtPayload.userId;
    return c.json(jwtPayload);
    //find user songs
    //return c.json({ message:userSongs,success:true},200);
  } catch (error: any) {
    return c.json({ message: "Internal Server Error", success: false }, 500);
  }
};


export const getSongById = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const prisma = await connectDB(c);
    if (!prisma) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }

    const songId = c.req.param("songId");
  } catch (error: any) {
    return c.json({ message: "Internal Server Error", success: false }, 500);
  }
};


export const updateSong = async (c: Context<{ Bindings: Bindings }>) => {
    try {
      const prisma = await connectDB(c);
      if (!prisma) {
        return c.json({ message: "Internal Server Error", success: false }, 500);
      }
  
      const songId = c.req.param("songId");
    } catch (error: any) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }
};


export const deleteSong = async (c: Context<{ Bindings: Bindings }>) => {
    try {
      const prisma = await connectDB(c);
      if (!prisma) {
        return c.json({ message: "Internal Server Error", success: false }, 500);
      }
  
      const songId = c.req.param("songId");
    } catch (error: any) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }
  };
