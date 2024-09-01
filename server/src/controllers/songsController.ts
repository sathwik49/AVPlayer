import { Context } from "hono";
import connectDB from "../config/db";
import Bindings from "../utils/Bindings";
import { uploadSongtoSupabaseBucket } from "./songStorage.supabase";
import { addSongValidation } from "../zod/songInputDataValidation";

export const addSong = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const prisma = await connectDB(c);
    if (!prisma) {
      return c.json({ message: "Internal Server Error", success: false }, 500);
    }

    const body = await c.req.parseBody();
    const songFile = body.songFile;

    const songName = body.songName as string;

    const inputValidation = addSongValidation({
      songName: body.songName,
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

    if (!(songFile instanceof File)) {
      return c.json({ message: "Invalid Song File type selected", success: false }, 400);
    }

    const fileUpload = await uploadSongtoSupabaseBucket(c, body.songName as string, songFile);

    if ( fileUpload.errorMessage || !fileUpload.success) {
      let message = fileUpload.errorMessage;
      return c.json({ message, success: fileUpload.success },400);
    }

    const fileUrl = fileUpload.url as string;
    const storedFileName = fileUpload.storedFileName as string;

    const jwtPayload = c.get("jwtPayload");
    const userId = jwtPayload.userId;

    const addUserSong = await prisma.song.create({
      data: {
        songName,
        url: fileUrl,
        storedFileName:storedFileName,
        user: {
          connect: { userId },
        },
      },
    });

    if (addUserSong) {
      return c.json({
        message: "Uploaded Successfully",
        details: addUserSong.songId,
        success: true,
      });
    }

    return c.json({ message: "Internal Server Error", success: false }, 500);
  } catch (error: any) {
    //console.error("Error:", error);
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
    //find user songs
    const userSongsUrls = await prisma.song.findMany({
      where:{
        user_id:userId
      },
      select:{
        url:true,
        storedFileName:true
      }
    })
    
    const urlsData = userSongsUrls.map(song => ({"storedSongName":song.storedFileName,"url":song.url}))
    

    return c.json({ details:urlsData,success:true},200);
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
