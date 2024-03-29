import React, { useState } from "react";
import { DiscordOutlined } from "@ant-design/icons";

import { Card, Skeleton } from "antd";

type UserProfileCardProps = {
  isLoading: boolean;
  name: string;
  imageUrl: string;
  value: number;
  unclaimedPoints: number;
};

const CardContent = ({ value, points }) => {
  return (
    <>
      <p>Value: {value} APT</p>
      <p>Unclaimed: {points} points </p>
    </>
  );
};

const userProfileCardStyle: React.CSSProperties = { margin: "15px" };

export const UserProfileCard = ({
  isLoading,
  name,
  imageUrl,
  value,
  unclaimedPoints,
}: UserProfileCardProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <Card
      hoverable
      style={userProfileCardStyle}
      cover={<img src={imageUrl} alt={name} />}
      type="inner"
    >
      <Skeleton loading={isLoading} avatar active>
        <h3>{name}</h3>
        <DiscordOutlined />
        <CardContent value={value} points={unclaimedPoints} />
      </Skeleton>
    </Card>
  );
};
