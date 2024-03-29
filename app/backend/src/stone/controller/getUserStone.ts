import { Request, Response } from "express";
import { mockUserStoneData } from "./mockData/mockUserStoneData";

export const getUserStoneController = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;

    return res.status(200).send(mockUserStoneData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
