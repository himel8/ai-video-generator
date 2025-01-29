import { boolean, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl"),
  subscription: boolean("subscription").default(false),
});

export const VideoData = pgTable("videoData", {
  id: serial("id").primaryKey(),
  script: json("videoScript").notNull(),
  audioFileUrl: varchar("audioUrl").notNull(),
  captions: json("captionText").notNull(),
  createdBy: varchar("createdBy").notNull(),
});
