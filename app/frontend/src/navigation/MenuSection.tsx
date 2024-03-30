import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { DollarOutlined, GiftOutlined, CrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { navigationPaths } from "./configuration";

const menuItems: MenuProps["items"] = [
  {
    label: "The Land",
    key: navigationPaths.main,
  },
  {
    label: "Lottery",
    key: navigationPaths.lottery,
    icon: <GiftOutlined />,
  },
  {
    label: "Treasure",
    key: navigationPaths.treasure,
    icon: <DollarOutlined />,
  },
  {
    label: "Leaderboard",
    key: navigationPaths.leaderboard,
    icon: <CrownOutlined />,
  },
];

export const MenuSection = () => {
  const navigate = useNavigate();

  const onClickMenuItem = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={menuItems}
      onClick={onClickMenuItem}
    />
  );
};
