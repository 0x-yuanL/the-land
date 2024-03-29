import { Stone } from "./Stone";

export enum ItemType {
  LAND = "LAND",
  APTOSNFT = "APTOSNFT",
}

export type ItemStone = {
  itemId: string;
  stoneMax: number;
  stoneIncreateRate: number;
  stoneClaimDuration: number;
  stoneList: Stone[];
  lastUpdatedTimeStamp: number;
  lastClaimedTimeStamp: number | null;
};
