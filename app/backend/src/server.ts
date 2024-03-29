import express from "express";
import { json } from "body-parser";
import cors from "cors";

import { apiRouter } from "./router";

const server = express();

server.use(cors());
server.use(json());

server.use("/api", apiRouter);

export { server };
