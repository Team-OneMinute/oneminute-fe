"use client";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { MapArea } from "../components/Organisms/MapArea";
import { useState } from "react";
import { FrameTemplate } from "../components/Templates/FrameTemplate";
import styled from "styled-components";

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
      <DescriptionArea>
        <FrameTemplate frameType="001" height="23vh" width="100%">
          <div>aaa</div>
        </FrameTemplate>
      </DescriptionArea>
    </SliderTemplate>
  );
};

const DescriptionArea = styled.div`
  width: 100%;
  margin-top: 2vh;
`;
