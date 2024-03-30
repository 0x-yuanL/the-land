import React from "react";

import { Flex } from "antd";
import { LandCard } from "./lands";
import { ItemCard } from "./items";

import { mockItemDataList } from "./mockData/mockItemDataList";
import { mockLandDataList } from "./mockData/mockLandDataList";

export const NFTSection = () => {
  const landCards = mockLandDataList.map((landData) => (
    <LandCard isLoading={false} {...landData} />
  ));

  const itemCards = mockItemDataList.map((itemData) => (
    <ItemCard isLoading={false} {...itemData} />
  ));

  const cards = [...landCards, ...itemCards];

  return (
    <Flex wrap="wrap" gap="small">
      {cards}
    </Flex>
  );
};
