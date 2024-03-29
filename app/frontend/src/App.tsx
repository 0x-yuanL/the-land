import React from "react";
import { HeaderSection, ContentSection, SiderSection } from "./displaySection";
import { Navigation } from "./navigation";
import { UserProfileSection } from "./userProfile";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { LandContainer } from "./lands";

import { Layout, Alert } from "antd";

export const App = () => {
  const { connected, account } = useWallet();

  return (
    <Layout>
      <HeaderSection>
        <Navigation />
      </HeaderSection>
      <Layout>
        <SiderSection>
          <UserProfileSection />
        </SiderSection>
        <ContentSection>
          <LandContainer />
        </ContentSection>
      </Layout>
    </Layout>
  );
};
