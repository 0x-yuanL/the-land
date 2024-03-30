import React, { useState } from "react";
import { DiscordOutlined, FireOutlined, PlusOutlined } from "@ant-design/icons";

import { Card, Skeleton, Row, Col, Button } from "antd";

type UserProfileCardProps = {
  isLoading: boolean;
  name: string;
  imageUrl: string;
  value: number;
  unclaimedStone: number;
  stoneQuality: number;
};

const CardContent = ({ value, stones, unclaimedStone }) => {
  return (
    <>
      <Row>
        <Col span={8}>Hot</Col>
        <Col span={8} offset={6}>
          <b>
            <FireOutlined /> 3.5k
            <span>
              <Button>
                <PlusOutlined />
                <span>Add Hot</span>
              </Button>
            </span>
          </b>
        </Col>
      </Row>
      <p>
        <Row>
          <Col span={8}>Value:</Col>
          <Col span={8} offset={6}>
            <b>{value} APT</b>
          </Col>
        </Row>
      </p>

      <p>
        <Row>
          <Col span={8}>Stone:</Col>
          <Col span={8} offset={6}>
            <b>{stones}</b>
          </Col>
        </Row>
      </p>
      <p>
        <Row>
          <Col span={8}>Unclaimed:</Col>
          <Col span={8} offset={6}>
            <b>{unclaimedStone}</b>
          </Col>
        </Row>
      </p>
    </>
  );
};

const userProfileCardStyle: React.CSSProperties = { margin: "15px" };

export const UserProfileCard = ({
  isLoading,
  name,
  imageUrl,
  value,
  unclaimedStone,
  stoneQuality,
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
        <h3>
          <DiscordOutlined /> @{name}
        </h3>

        <CardContent
          value={value}
          stones={stoneQuality}
          unclaimedStone={unclaimedStone}
        />
      </Skeleton>
    </Card>
  );
};
