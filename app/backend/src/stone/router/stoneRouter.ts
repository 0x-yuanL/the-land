import express from "express";
import { getItemStoneController, getUserStoneController } from "../controller";

const stoneRouter = express.Router();

stoneRouter.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from stoneRouter" });
});

stoneRouter.get("/item/:itemId", getItemStoneController);
stoneRouter.get("/user/:userId", getUserStoneController);

export { stoneRouter };
