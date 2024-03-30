import { useEffect, useState } from "react";

import { LoadStatus } from "../../types";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { getAllLand } from "../../../utils/aptos";

export const useLands = () => {
  const [lands, setLands] = useState({
    lands: "",
    loadStatus: LoadStatus.IDLE,
  });

  const fetchPetName = async () => {
    setLands({ ...lands, loadStatus: LoadStatus.LOADING });

    getAllLand()
      .then(() => {
        setLands({ ...lands, loadStatus: LoadStatus.LOADED });
      })
      .catch((error) => {
        console.error("Failed to fetch pet name", error);
        setLands({ ...lands, loadStatus: LoadStatus.ERROR });
      });
  };

  useEffect(() => {
    if (lands.loadStatus === LoadStatus.IDLE) {
      fetchPetName();
    }
  });

  return { lands };
};
