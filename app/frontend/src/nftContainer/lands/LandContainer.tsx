import React from "react";

import { Flex } from "antd";
import { LandCard } from "./LandCard";

import { mockLandDataList } from "../mockData/mockLandDataList";

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
