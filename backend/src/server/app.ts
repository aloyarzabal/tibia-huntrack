import express from "express";

import cors from "cors";
import { characterRouter } from "../modules/characters/characters.router";
import { sessionRouter } from "../modules/sessions/sessions.router";

export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-type",
  })
);
app.use(express.json());

app.use("/characters", characterRouter);
app.use("/sessions", sessionRouter);
