import { Request, Response } from "express";
import { mockItemStoneData } from "./mockData/mockItemStoneData";

export const getItemStoneController = async (req: Request, res: Response) => {
  try {
    const itemId = req.params?.itemId;

    return res.status(200).send(mockItemStoneData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
