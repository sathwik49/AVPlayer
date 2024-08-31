import { Context, Hono } from "hono";
import { addSong, deleteSong, getAllSongs, getSongById, updateSong } from "../controllers/songsController";
import { authenticateUser } from "../middleware/authenticateUser";
import Bindings from "../utils/Bindings";

const songsRouter = new Hono()

songsRouter.use(authenticateUser);
songsRouter.post('/add-song',addSong)
songsRouter.get('/get-songs',getAllSongs)
songsRouter.get('/get-song/:songId',getSongById)
songsRouter.post('/update-song/:songId',updateSong)
songsRouter.delete('/delete-song/:songId',deleteSong)

export default songsRouter