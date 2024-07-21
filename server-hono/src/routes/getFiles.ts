import { Hono } from "hono";
import { getFileById } from "../controllers/getFilesController";

const file = new Hono()

file.get('/',getFileById)

export default file;