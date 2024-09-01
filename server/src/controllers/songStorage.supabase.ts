import { Context } from "hono";
import Bindings from "../utils/Bindings";
import { supabaseSetup } from "../utils/supabaseSetup";
import { v4 as uuid } from 'uuid'


export const uploadSongtoSupabaseBucket = async (c: Context<{ Bindings: Bindings }>, songName: string, songFile: File) => {
    const supabase = await supabaseSetup(c);
    if (!supabase) {
      return { message: "Internal Server Error", success: false };
    }

    const { userId, username } = c.get("jwtPayload");

    const fileName = `${uuid()}-${username}-${songName}`;

   
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(c.env.SUPABASE_BUCKET_NAME) // Use your Supabase bucket name
      .upload(`user-files/${fileName}`, songFile, {
        contentType: songFile.type,
        upsert: false,
      });

    if (uploadError) {
      return { errorMessage: 'Upload failed. Please try again / File already exists', success: false };
    }

    const { data: urlData } = supabase.storage
      .from(c.env.SUPABASE_BUCKET_NAME)
      .getPublicUrl(`user-files/${fileName}`);

    if (!urlData.publicUrl) {
      return { errorMessage: 'Error getting public URL. File uploaded', success: false };
    }

    return {
      message: 'File uploaded successfully!',
      url: urlData.publicUrl,
      storedFileName:fileName,
      success: true,
    };
};
