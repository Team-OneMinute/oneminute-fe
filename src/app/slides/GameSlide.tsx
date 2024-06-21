"use client";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { MapArea } from "../components/Organisms/MapArea";
import { useState } from "react";
import { FrameTemplate } from "../components/Templates/FrameTemplate";
import styled from "styled-components";
import { Button } from "@/app/components/Molecules/Button";

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

  const run = () => {
    console.log("");
  }

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
          <ButtonsArea>
            <Button
              size="small"
              variant="whiteFilled"
              text="Play"
              onClick={run}
            />
          </ButtonsArea>
        </FrameTemplate>
      </DescriptionArea>
    </SliderTemplate>
  );
};

const DescriptionArea = styled.div`
  width: 100%;
  margin-top: 2vh;
`;

const ButtonsArea = styled.div`
  display: flex;
  align-items: end;
`;