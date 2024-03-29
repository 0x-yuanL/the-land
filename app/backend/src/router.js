import express from "express";
import { stoneRouter } from "./stone";

export const apiRouter = express.Router();

apiRouter.use("/stone", stoneRouter);
