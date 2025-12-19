import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from "./characters.controller";

export const characterRouter = express.Router();

characterRouter.route("/").get(getCharacters).post(createCharacter);
characterRouter
  .route("/:id")
  .get(getCharacter)
  .patch(updateCharacter)
  .delete(deleteCharacter);
