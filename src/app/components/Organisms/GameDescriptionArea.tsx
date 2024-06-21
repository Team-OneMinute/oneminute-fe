"use client";
import styled from "styled-components";
import { Frame } from "@/app/components/Molecules/Frame";

export const GameDescriptionArea = () => {
  return (
    <GameDescriptionComponent>
      <GameDescription />
    </GameDescriptionComponent>
  );
};

const GameDescriptionComponent = styled.div``;

const GameDescription = styled.textarea``;
