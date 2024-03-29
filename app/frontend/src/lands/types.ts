export enum LoadingStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export type LandAttributes = {
  name: string;
  price: number;
  ability: number;
};

export type PointClaimStatus = {
  progress: number;
};

export type LandResource = {
  imageUrl: string;
};

export type LandCard = LandAttributes & LandResource;
