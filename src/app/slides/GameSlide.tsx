"use client";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { MapArea } from "../components/Organisms/MapArea";
import { useState } from "react";
import { FrameTemplate } from "../components/Templates/FrameTemplate";
import styled from "styled-components";
import { Button } from "@/app/components/Molecules/Button";
import { Modal } from "@/app/components/Organisms/Modal";
import { usePageNavigate } from "../hooks/util/usePageNavigate";
import { useGameInfo } from "../hooks/service/useGameInfo";

export const GameSlide = () => {
  const [selectedGameId, setSelectedGameId] = useState<string>("0001");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getGameInfoByStore } = useGameInfo();
  const { goto } = usePageNavigate();

  const gameList = getGameInfoByStore();
  console.log("gameList", gameList);
  const selectedGame = gameList.find(game => game.gameId == selectedGameId);
  const gameDescription = selectedGame ? selectedGame.description : "";

  const handleOpenModal = () => {
    console.log("open modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const gamePlayButtonHandler = (playMode: "free" | "main") => {
    switch (playMode) {
      case "main":
      // TODO: check has life
        // TODO: start game api
      case "free":
      default:
        goto("game");
    }
    console.log("");
  }

  return (
    <SliderTemplate>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Modal Title"
        actions={
          <>
            <Button
              size="small"
              variant="blackFilled"
              text="FreePlay"
              onClick={() => gamePlayButtonHandler("free")}
            />
            <Button
              size="small"
              variant="blackFilled"
              text="MainPlay"
              onClick={() => gamePlayButtonHandler("main")}
            />
          </>
        }
      >
        <GameDescription>{gameDescription}</GameDescription>
      </Modal>
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
              onClick={handleOpenModal}
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

const GameDescription = styled.p`
  color: #000000;
`;