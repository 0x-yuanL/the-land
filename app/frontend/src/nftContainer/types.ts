export enum LoadStatus {
  IDLE = "idle",
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}

export type LandAttributes = {
  name: string;
  price: number;
  stone: number;
};

export type StoneClaimStatus = {
  progress: number;
};

export type NFTResource = {
  imageUrl: string;
};

export type LandCard = LandAttributes & NFTResource;

export type ItemAttributes = {
  owner: string;
  name: string;
  stone: number;
};

export type ItemCard = ItemAttributes & NFTResource;

export type NFTCard = LandCard | ItemCard;
