"use client";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { MapArea } from "../components/Organisms/MapArea";
import { useState } from "react";

export const GameSlide = () => {
  const [selectedGameId, setSelectedGameId] = useState<string>("0001");
  const gameList = [
    // TODO: get gameList
    {
      gameId: "0001",
    },
    {
      gameId: "0002",
    },
    {
      gameId: "0003",
    },
    {
      gameId: "0004",
    },
  ];

  return (
    <SliderTemplate>
      <MapArea
        gameList={gameList}
        selectedGameId={selectedGameId}
        setSelectedGameId={setSelectedGameId}
      />
    </SliderTemplate>
  );
};
