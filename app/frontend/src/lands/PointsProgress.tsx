import React from "react";
import { Flex, Progress } from "antd";

type PointsProgressProps = {
  percent: number;
};

export const PointsProgress = ({ percent }: PointsProgressProps) => (
  <Flex vertical gap="middle">
    <Progress
      percent={percent}
      status="active"
      strokeColor={{ from: "#108ee9", to: "#87d068" }}
    />
  </Flex>
);
