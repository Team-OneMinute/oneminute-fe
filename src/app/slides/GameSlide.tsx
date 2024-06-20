"use client";
import styled from "styled-components";
import { SliderTemplate } from "../components/Templates/SliderTemplate";

const targetMark = (isSelected: boolean) => {
  return isSelected ? (
    <TargetDiv>
      <img src="/Target_red.svg" />
    </TargetDiv>
  ) : (
    <TargetDiv>
      <img src="/Target_white.svg" />
    </TargetDiv>
  );
};

export const GameSlide = () => {
  return (
    <SliderTemplate>
      <MapArea src="/map.webp" />
      {targetMark(true)}
    </SliderTemplate>
  );
};

const MapArea = styled.img`
  margin-top: 4vh;
  width: 100%;
`;

const TargetDiv = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
`;
