import React from "react";
import { UserProfileCard } from "./UserProfileCard";

export const UserProfileSection = () => {
  const mockUserProfileData = {
    isLoading: false,
    name: "The Land - user",
    imageUrl:
      "https://djmahssgw62sw.cloudfront.net/general/0xe7fd727a9634aaf550ded49b275465563bebfb73b4ffd49dff03089336c320bf.png",
    value: 10,
    unclaimedStone: 50,
    stoneQuality: 100,
  };
  return <UserProfileCard {...mockUserProfileData} />;
};
