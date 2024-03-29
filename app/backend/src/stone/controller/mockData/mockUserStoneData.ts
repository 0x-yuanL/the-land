import { UserStone, ItemStone, StoneType, StoneStatus } from "../../model";

export const mockUserStoneData: UserStone[] = [
  {
    userId: "user-1",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 20,
        owner: "user-1",
      },
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 100,
        owner: "user-1",
      },
    ],
    lastUpdatedTimeStamp: 1711726620240,
  },
  {
    userId: "2",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 30,
        owner: "user-2",
      },
    ],
    lastUpdatedTimeStamp: 1711726620340,
  },
];
