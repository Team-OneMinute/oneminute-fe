"use client";
import styled from "styled-components";
import { Frame } from "@/app/components/Molecules/Frame";
import { Map } from "@/app/components/Molecules/Map";
import { TargetIcon } from "../Molecules/TargetIcon";

interface Props {
  gameList: { gameId: string }[]; // TODO: make interface
  selectedGameId: string;
  setSelectedGameId: (gameId: string) => void;
}

const targetPositions = [
  {
    x: 50,
    y: 50,
  },
  {
    x: 60,
    y: 70,
  },
  {
    x: 70,
    y: 20,
  },
  {
    x: 20,
    y: 20,
  },
  {
    x: 30,
    y: 80,
  },
];

const getTargetIconList = (
  gameList: { gameId: string }[], // TODO: make interface
  selectedGameId: string
) => {
  return gameList.map((game, index) => {
    const isSelected = game.gameId == selectedGameId;
    return (
      <TargetIcon isSelected={isSelected} position={targetPositions[index]} />
    );
  });
};

export const MapArea = (props: Props) => {
  const { gameList, selectedGameId, setSelectedGameId } = props;

  return (
    <Component>
      <MapFrame>
        <Frame frameType={"mapFrame"} />
      </MapFrame>
      <MapComponent>
        <Map />
        {getTargetIconList(gameList, selectedGameId)}
      </MapComponent>
    </Component>
  );
};

const Component = styled.div`
  height: 100%
  width: 100%;
`;

const MapFrame = styled.div`
  width: 100%;
`;

const MapComponent = styled.div`
  position: relative;
  width: 100%;
`;
