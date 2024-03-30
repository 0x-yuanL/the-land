import React from "react";

import { Flex } from "antd";
import { LandCard } from "./lands";
import { ItemCard } from "./items";

import { mockItemDataList } from "./mockData/mockItemDataList";
import { mockLandDataList } from "./mockData/mockLandDataList";

import { useLands } from "./lands/hooks";

export const NFTSection = () => {
  const { lands } = useLands();

  console.log("=== lands", lands);

  const landCards = mockLandDataList.map((landData) => (
    <LandCard key={landData.name} isLoading={false} {...landData} />
  ));

  const itemCards = mockItemDataList.map((itemData) => (
    <ItemCard key={itemData.name} isLoading={false} {...itemData} />
  ));

  const cards = [...landCards, ...itemCards];

  return (
    <Flex wrap="wrap" gap="small">
      {cards}
    </Flex>
  );
};
