import React from "react";
import { Col, Row } from "antd";

import { WalletButtons } from "../wallet";
import { MenuSection } from "./MenuSection";

export const Navigation = () => (
  <Row justify="space-between">
    <Col span={12}>
      <MenuSection />
    </Col>
    <Col>
      <WalletButtons />
    </Col>
  </Row>
);
