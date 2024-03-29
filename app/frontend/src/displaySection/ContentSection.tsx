import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const contentSectionStyle: React.CSSProperties = {
  margin: "12px 16px 0",
};

export const ContentSection = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={contentSectionStyle}>
      <div
        style={{
          padding: 24,
          minHeight: "100vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </Content>
  );
};
