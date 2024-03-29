import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {Land, LandProp} from "./types";

const config = new AptosConfig({
  network: Network.DEVNET,
});

export const aptos = new Aptos(config);

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;

export const LAND_CONTRACT_ADDRESS = "0x62533bd299c8e81fe29fc489a7208c112772632459688a1f3a4922f32045d4a9";
export const  LAND_COLLECTION_ID = "0x510ebc79073e86070e48f2c204dfeda80229d71f43174640c2eb2a3ac02d8409";

export const getLand = async (
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

