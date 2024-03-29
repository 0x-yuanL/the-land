import React from "react";

import { Layout } from "antd";

const { Footer } = Layout;

export const FooterSection = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      ©{new Date().getFullYear()} Move on Aptos Hackathon - The Land
    </Footer>
  );
};
