import { Context } from "hono";

export const getFileById = async (c:Context)=>{
    const id = c.req.param('id')
    console.log(id);
    
}