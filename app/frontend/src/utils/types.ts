export type Land = {
    name: string;
    address: string;
}
export type LandProp = {
    lastHarvestTimeStamp: number;
    owner: string;
    price: number;
}

export type LandUserProp = {
    avatar: string;
}
export type TokenData = [
    name: string
]

export type Nft = {
    address: string;
    tokenData: TokenData
}