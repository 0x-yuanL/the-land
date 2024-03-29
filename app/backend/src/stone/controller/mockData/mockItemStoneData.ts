import { ItemStone, StoneType, StoneStatus } from "../../model";

const STONE_MAX = 100;
const STONE_INCREASE_RATE = 1;
const STONE_MAX_DURATION = 200;

export const mockItemStoneData: ItemStone[] = [
  {
    itemId: "item-1",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 100,
        owner: "item-1",
      },
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 100,
        owner: "item-1",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620240,
    lastClaimedTimeStamp: 1711726620240,
  },
  {
    itemId: "item-2",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 20,
        owner: "item-2",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620340,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-3",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 50,
        owner: "item-3",
      },
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 200,
        owner: "item-3",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620440,
    lastClaimedTimeStamp: 1711726620440,
  },
  {
    itemId: "item-4",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 10,
        owner: "item-4",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620540,
    lastClaimedTimeStamp: null,
  },

  {
    itemId: "item-5",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 30,
        owner: "item-5",
      },
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 150,
        owner: "item-5",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620640,
    lastClaimedTimeStamp: 1711726620640,
  },
  {
    itemId: "item-6",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 60,
        owner: "item-6",
      },
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 250,
        owner: "item-6",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620740,
    lastClaimedTimeStamp: 1711726620740,
  },
  {
    itemId: "item-7",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 15,
        owner: "item-7",
      },
      {
        type: StoneType.IRON,
        status: StoneStatus.CLAIMED,
        quantity: 50,
        owner: "item-7",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620840,
    lastClaimedTimeStamp: 1711726620840,
  },
  {
    itemId: "item-8",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 40,
        owner: "item-8",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726620940,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-9",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 70,
        owner: "item-9",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621040,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-10",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 20,
        owner: "item-10",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621140,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-11",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 100,
        owner: "item-11",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621240,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-12",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 80,
        owner: "item-12",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621340,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-13",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 25,
        owner: "item-13",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621440,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-14",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 60,
        owner: "item-14",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621540,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-15",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 90,
        owner: "item-15",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621640,
    lastClaimedTimeStamp: null,
  },
  {
    itemId: "item-16",
    stoneList: [
      {
        type: StoneType.IRON,
        status: StoneStatus.UNCLAIMED,
        quantity: 30,
        owner: "item-16",
      },
    ],
    stoneMax: STONE_MAX,
    stoneIncreateRate: STONE_INCREASE_RATE,
    stoneClaimDuration: STONE_MAX_DURATION,
    lastUpdatedTimeStamp: 1711726621740,
    lastClaimedTimeStamp: null,
  },
];
