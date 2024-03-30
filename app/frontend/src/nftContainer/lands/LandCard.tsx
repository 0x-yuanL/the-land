import React from "react";

import { DiscordOutlined, FireOutlined } from "@ant-design/icons";
import { Card, Skeleton, Button, Flex } from "antd";
import { LandAttributes, NFTResource, StoneClaimStatus } from "../types";
import { ProgressBar } from "../../progressBar/ProgressBar";
import { AptosIcon } from "../items/aptosIcon";

type LandCardPros = LandAttributes &
  NFTResource &
  StoneClaimStatus & { isLoading: boolean };

const CardAction = () => {
  return <Button block>Buy this land</Button>;
};

const CardContent = ({ price }) => {
  return (
    <p>
      <b>{price} APT</b>
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
      <span>@{name}</span>
    </Flex>
  );
};

const landCardStyle: React.CSSProperties = { width: 200 };

export const LandCard = ({
  isLoading,
  name,
  imageUrl,
  price,
  stone,
  progress,
}: LandCardPros) => {
  return (
    <>
      <Card
        hoverable
        style={landCardStyle}
        cover={<img src={imageUrl} alt={name} />}
        type="inner"
        title={
          <span>
            <FireOutlined /> 3.1k
          </span>
        }
      >
        <Skeleton loading={isLoading} avatar active>
          <UserSource name={name} source={"discord"} />
          <CardAction />
          <CardContent price={price} />
          <ProgressBar percent={progress} />
        </Skeleton>
      </Card>
    </>
  );
};
