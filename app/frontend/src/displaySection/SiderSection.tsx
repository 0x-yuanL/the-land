import React from "react";

import { Layout } from "antd";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  borderRadius: "4px",
  overflow: "auto",
  height: "100vh",
  top: "5px",
  alignItems: "center",
};

export const SiderSection = ({ children }) => {
  return (
    <Sider theme="light" width="300" style={siderStyle}>
      {children}
    </Sider>
  );
};
