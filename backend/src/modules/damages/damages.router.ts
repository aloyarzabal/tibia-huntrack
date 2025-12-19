import express from "express";
import * as controller from "./damages.controller";

const damageRouter = express.Router();

damageRouter.route("/").get(controller.getAllDamageInputs);

damageRouter
  .route("/:id")
  .get(controller.getDamageInputById)
  .delete(controller.deleteDamageInputById);

damageRouter
  .route("/session/:sessionId")
  .get(controller.getDamageInputBySession)
  .delete(controller.deleteDamageInputBySession);

export default damageRouter;
