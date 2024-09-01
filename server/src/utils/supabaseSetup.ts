import { createClient } from "@supabase/supabase-js";
import { Context } from "hono";
import Bindings from "./Bindings";


export const supabaseSetup = async (c:Context<{Bindings:Bindings}>)=>{
    try {
        const supabase = createClient(
            c.env.SUPABASE_URL,
            c.env.SUPABASE_KEY
        );
        return supabase;
    } catch (error:any) {
        console.log(error)
        return false;
    }
}


