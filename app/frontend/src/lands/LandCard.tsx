import React from "react";

import { Card, Skeleton, Button } from "antd";
import { LandAttributes, LandResource, PointClaimStatus } from "./types";
import { PointsProgress } from "./PointsProgress";

type LandCardPros = LandAttributes &
  LandResource &
  PointClaimStatus & { isLoading: boolean };

const CardAction = () => {
  return <Button block>Buy Now</Button>;
};

const CardContent = ({ price, ability }) => {
  return (
    <>
      <p>
        <b>{price} APT</b>
      </p>
      <p>{ability} points </p>
    </>
  );
};

const landCardStyle: React.CSSProperties = { width: 150 };

export const LandCard = ({
  isLoading,
  name,
  imageUrl,
  price,
  ability,
  progress,
}: LandCardPros) => {
  return (
    <>
      <Card
        hoverable
        style={landCardStyle}
        cover={<img src={imageUrl} alt={name} />}
        type="inner"
      >
        <Skeleton loading={isLoading} avatar active>
          <PointsProgress percent={progress} />
          <CardContent price={price} ability={ability} />
          <CardAction />
        </Skeleton>
      </Card>
    </>
  );
};
