import { Stone } from "./Stone";

export type UserStone = {
  userId: string;
  stoneList: Stone[];
  lastUpdatedTimeStamp: number;
};
