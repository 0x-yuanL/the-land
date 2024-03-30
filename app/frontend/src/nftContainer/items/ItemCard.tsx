import React from "react";

import { DiscordOutlined } from "@ant-design/icons";
import { Card, Skeleton, Button, Flex } from "antd";
import { ItemAttributes, NFTResource, StoneClaimStatus } from "../types";
import { ProgressBar } from "../../progressBar/ProgressBar";
import { AptosIcon } from "./aptosIcon";

type ItemCardPros = ItemAttributes &
  NFTResource &
  StoneClaimStatus & { isLoading: boolean };

const CardAction = () => {
  return <Button block>Boost</Button>;
};

const CardContent = ({ stoneQuality }) => {
  return (
    <p>
      <b>{stoneQuality} stones</b>
    </p>
  );
};

const UserSource = ({ name, source }) => {
  const sourceMap = {
    discord: <DiscordOutlined />,
    aptos: <AptosIcon />,
  };

  return (
    <Flex wrap="wrap" gap="small" style={{ marginBottom: "20px" }}>
      {sourceMap[source]}
      <span>{name}</span>
    </Flex>
  );
};

const itemCardStyle: React.CSSProperties = { width: 200 };

export const ItemCard = ({
  isLoading,
  name,
  imageUrl,
  stone,
  progress,
}: ItemCardPros) => {
  return (
    <>
      <Card
        hoverable
        style={itemCardStyle}
        cover={<img src={imageUrl} alt={name} />}
        type="inner"
      >
        <Skeleton loading={isLoading} avatar active>
          <UserSource name={name} source={"aptos"} />
          <CardAction />
          <CardContent stoneQuality={stone} />
          <ProgressBar percent={progress} />
        </Skeleton>
      </Card>
    </>
  );
};