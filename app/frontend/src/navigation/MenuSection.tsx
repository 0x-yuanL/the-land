import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";

const menuItems: MenuProps["items"] = [
  {
    label: "Land Booster",
    key: "main",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Land Treasure",
    key: "lottery",
    icon: <SettingOutlined />,
  },
];

export const MenuSection = () => {
  return <Menu theme="dark" mode="horizontal" items={menuItems} />;
};
