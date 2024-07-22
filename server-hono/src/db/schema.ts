import { pgTable, serial, text, doublePrecision, integer, primaryKey, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    username: text('username').unique().notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    mobile: text('mobile'),
});

export const playlists = pgTable('playlists', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    user_id: serial('user_id').references(()=>users.id).notNull(),
});

export const songs = pgTable('songs', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    duration: doublePrecision('duration'),
    artist : text("artist"),
    url: text('url').notNull(),
    removed : boolean('removed').default(false),
});

export const playlistSongs = pgTable('playlist_songs', {
    playlist_id: serial('playlist_id').references(()=>playlists.id).notNull(),
    song_id: serial('song_id').references(()=>songs.id).notNull(),
},(table)=>{
    return {
        pk: primaryKey({columns : [table.playlist_id,table.song_id]})
    }
});
