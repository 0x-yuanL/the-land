import React from "react";
import { Col, Row } from "antd";

import { WalletButtons } from "../wallet";
import { MenuSection } from "./MenuSection";

export const Navigation = ({}) => (
  <Row>
    <Col span={12}>
      <MenuSection />
    </Col>
    <Col>
      <WalletButtons />
    </Col>
  </Row>
);
