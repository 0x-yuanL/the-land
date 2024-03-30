import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { Land, LandProp, LandUserProp, Nft } from "./types";
import { Provider, Network as  aptosNetwork } from "aptos";

const config = new AptosConfig({
  network: Network.DEVNET,
});
export const provider = new Provider(aptosNetwork.DEVNET);
export const aptos = new Aptos(config);

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;
export const LAND_USER_CONTRACT_ADDRESS = "0x2b25734658903a741486e434f614d26f227e099d1bf13d123f7f32f3d1b62961";

export const  LAND_USER_COLLECTION_ID = "0x1bb43f28b172a3bb74ca7b9b22d8dbd3d956f6aabfb619011b31c1ff3e8c60c5"
export const LAND_CONTRACT_ADDRESS = "0x62533bd299c8e81fe29fc489a7208c112772632459688a1f3a4922f32045d4a9";
export const  LAND_COLLECTION_ID = "0x510ebc79073e86070e48f2c204dfeda80229d71f43174640c2eb2a3ac02d8409";

export const getLandProp = async (
    landObjectAddr: string
): Promise<[string, LandProp]> => {
  const landProp = await aptos.view({
    payload: {
      function: `${LAND_CONTRACT_ADDRESS}::main::get_landProp`,
      typeArguments: [],
      functionArguments: [landObjectAddr],
    },
  });
  return [landProp[0] as string, landProp[1] as LandProp];
};

export const getAllLand = async () => {
  const result: {
    current_token_datas_v2: Land[];
  } = await aptos.queryIndexer({
    query: {
      query: `
        query MyQuery($collectionId: String) {
          current_token_datas_v2(
            where: {collection_id: {_eq: $collectionId}}
          ) {
            name: token_name
            address: token_data_id
          }
        }
      `,
      variables: { collectionId: LAND_COLLECTION_ID },
    },
  });

  return result.current_token_datas_v2;
};

export const getLandUserProp = async (
    landObjectAddr: string
): Promise<[string, LandUserProp]> => {
  const landUserProp = await aptos.view({
    payload: {
      function: `${LAND_USER_CONTRACT_ADDRESS}::main::get_landuser`,
      typeArguments: [],
      functionArguments: [landObjectAddr],
    },
  });
  return [landUserProp[0] as string, landUserProp[1] as LandUserProp];
};

export const getOwnedLandUserToken = async (walletAddress: string) => {
  const result: {
    current_token_datas_v2: Nft[];
  } = await aptos.queryIndexer({
    query: {
      query: `
        query MyQuery(walletAddress: String, $collectionId: String) {
          current_token_ownerships_v2(
            where: {owner_address: {_eq: $walletAddress}, current_token_data: {collection_id: {_eq: $collectionId}}}
          ) {
            address: token_data_id
          }
        }
      `,
      variables: { collectionId: LAND_USER_COLLECTION_ID, walletAddress: walletAddress },
    },
  });

  return result.current_token_datas_v2;
};
/**
 * create LandUser signature
 *
 const response = await signAndSubmitTransaction({
 function: `${LAND_USER_CONTRACT_ADDRESS}::main::create_landuser`,
 type_arguments: [],
 arguments: [username, imgUrl]
 });

 await provider.waitForTransaction(response.hash)
 *
 */

/**
 * buy land signature
 *
     const response = await signAndSubmitTransaction({
     function: `${LAND_CONTRACT_ADDRESS}::main::buy_landProp`,
     type_arguments: [APT],
     arguments: [tokenAdress]
     });

     await provider.waitForTransaction(response.hash);
 *
 */

