export enum StoneType {
  IRON = "IRON",
  GOLD = "GOLD",
  DIAMOND = "DIAMOND",
}

export enum StoneStatus {
  CLAIMED = "CLAIMED",
  UNCLAIMED = "UNCLAIMED",
  DESTROYED = "DESTROYED",
  LOCKED = "LOCKED",
}

export enum StoneActionType {
  INCREASE_RATE = "INCREASE_RATE",
  REDUCE_RATE = "REDUCE_RATE",
  ADD_AMOUNT = "ADD_AMOUNT",
  DECREASE_AMOUNT = "DECREASE_AMOUNT",
  Ide = "Ide",
}

export type StoneItem = {
  type: StoneType;
  status: StoneStatus;
  quantity: number;
};

export type UserStone = {
  userId: string;
  stoneItems: StoneItem[];
  lastUpdatedTimeStamp: number;
};
