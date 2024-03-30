import React from "react";

import {
  DiscordOutlined,
  RocketOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Button, Flex } from "antd";
import { ItemAttributes, NFTResource, StoneClaimStatus } from "../types";
import { ProgressBar } from "../../progressBar/ProgressBar";
import { AptosIcon } from "./customizedIcons";

type ItemCardPros = ItemAttributes &
  NFTResource &
  StoneClaimStatus & { isLoading: boolean };

const CardAction = () => {
  return (
    <Button block>
      <RocketOutlined />
      <span>Relay</span>
    </Button>
  );
};

const CardContent = ({ stoneQuality }) => {
  return (
    <p>
      <span>
        <b>{stoneQuality} stones</b>
      </span>
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
        title={
          <span>
            <FireOutlined /> 3.1k
          </span>
        }
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
