"use client";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { MapArea } from "../components/Organisms/MapArea";
import { useEffect, useState } from "react";
import { FrameTemplate } from "../components/Templates/FrameTemplate";
import styled from "styled-components";
import { Button } from "@/app/components/Molecules/Button";
import { Modal } from "@/app/components/Organisms/Modal";
import { usePageNavigate } from "../hooks/util/usePageNavigate";
import { useGameInfo } from "../hooks/service/useGameInfo";
import { useGameStart } from "../hooks/service/useGameStart";
import { useUserInfo } from "../hooks/service/useUserInfo";
import GameWorld from "../components/Organisms/GameWorld";

interface Props {
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
}

export const GameSlide = (props: Props) => {
  const [selectedGameId, setSelectedGameId] = useState<string>("0001");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getGameInfoByStore } = useGameInfo();
  const { goto } = usePageNavigate();
  const { startGame } = useGameStart();
  const { uid } = useUserInfo();

  const gameList = getGameInfoByStore();
  console.log("gameList", gameList);
  const selectedGame = gameList.find((game) => game.gameId == selectedGameId);
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
        startGame(uid, selectedGameId);
      case "free":
      default:
        goto("game");
    }
    console.log("");
  };

  useEffect(() => {
    console.log("selected game id", selectedGameId);
  }, [selectedGameId]);

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
        <ModalBody>{gameDescription}</ModalBody>
      </Modal>
      <GameWorldArea>
        <GameWorld
          handleTouchStart={props.handleTouchStart}
          handleTouchEnd={props.handleTouchEnd}
          gameList={gameList}
          setSelectedGameId={setSelectedGameId}
        />
      </GameWorldArea>

      <DescriptionArea>
        <FrameTemplate frameType="001" height="23vh" width="100%">
          <DescriptionTitle>Running Man</DescriptionTitle>
          <DescriptionBody>{gameDescription}</DescriptionBody>
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

const GameWorldArea = styled.div`
  width: 100%;
  height: 52%;
  position: absolute;
  top: 20%;
`;

const DescriptionArea = styled.div`
  width: 100%;
  margin-top: 59vh;
`;

const DescriptionTitle = styled.div`
  position: absolute;
  top: 2%;
  right: 26%;
`;

const DescriptionBody = styled.p`
  position: absolute;
  width: 78%;
  height: 39%;
  overflow: scroll;
  word-break: break-word;
  text-align: start;
  left: 14%;
  top: 20%;
`;

const ButtonsArea = styled.div`
  position: absolute;
  bottom: 16%;
  right: 9%;
`;

const ModalBody = styled.p`
  color: #000000;
`;
