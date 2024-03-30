import React from "react";

import { Flex } from "antd";
import { LandCard } from "./LandCard";

import { mockLandDataList } from "../mockData/mockLandDataList";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {APT, LAND_CONTRACT_ADDRESS, provider} from "../../utils";

export const LandContainer = () => {
  const lands = mockLandDataList.map((landData) => (
    <LandCard isLoading={false} {...landData} />
  ));
  const { account, network, signAndSubmitTransaction } = useWallet();
  let tokenAdress

  const onBuyland = async () => {
    const response = await signAndSubmitTransaction({
      type: "entry_function_payload",
      function: `${LAND_CONTRACT_ADDRESS}::main::buy_landProp`,
      type_arguments: [APT],
      arguments: [tokenAdress]
    });
    await provider.waitForTransaction(response.hash);
  }

  return (
    <Flex wrap="wrap" gap="small">
      {lands}
    </Flex>
  );
};
