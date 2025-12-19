import express from "express";
import {
  createSession,
  deleteSession,
  getSession,
  getAllSessions,
  updateSession,
  previewSession,
} from "./sessions.controller";

export const sessionRouter = express.Router();

sessionRouter.route("/").get(getAllSessions).post(createSession);

sessionRouter
  .route("/:id")
  .get(getSession)
  .patch(updateSession)
  .delete(deleteSession);

sessionRouter.route("/preview").post(previewSession);
