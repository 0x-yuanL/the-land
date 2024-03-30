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

  return (
    <Flex wrap="wrap" gap="small">
      {lands}
    </Flex>
  );
};
