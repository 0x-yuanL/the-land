import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

export const HeaderSection = ({ children }) => {
  return <Header>{children}</Header>;
};
