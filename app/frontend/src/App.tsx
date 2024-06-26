import React from "react";
import { HeaderSection, ContentSection, SiderSection } from "./displaySection";
import { Navigation, navigationPaths } from "./navigation";
import { UserProfileSection } from "./userProfile";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NFTSection } from "./nftContainer";
import { Routes, Route } from "react-router-dom";

import { Layout } from "antd";
import {LotterySection} from "./lottery";

const MainPage = () => {
  return (
    <Layout>
      <SiderSection>
        <UserProfileSection />
      </SiderSection>
      <ContentSection>
        <NFTSection />
      </ContentSection>
    </Layout>
  );
};

const LotteryPage = () => {
  return (
    <Layout>
      <SiderSection>
        <UserProfileSection />
      </SiderSection>
        <ContentSection>
            <LotterySection></LotterySection>
        </ContentSection>
    </Layout>
  );
};

const TreatureDashboard = () => {
  return (
    <Layout>
      <h3>Treasure Dashboard</h3>
    </Layout>
  );
};

const LeaderboardPage = () => {
  return (
    <Layout>
      <h3>Leaderboard page</h3>
    </Layout>
  );
};

export const App = () => {
  const { connected, account } = useWallet();

  return (
    <Layout>
      <HeaderSection>
        <Navigation />
      </HeaderSection>
      <Routes>
        <Route path={navigationPaths.main} element={<MainPage />} />
        <Route path={navigationPaths.lottery} element={<LotteryPage />} />
        <Route
          path={navigationPaths.treasure}
          element={<TreatureDashboard />}
        />
        <Route
          path={navigationPaths.leaderboard}
          element={<LeaderboardPage />}
        />
      </Routes>
    </Layout>
  );
};
