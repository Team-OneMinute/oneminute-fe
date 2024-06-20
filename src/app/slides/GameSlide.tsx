"use client";
import styled from "styled-components";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { MapArea } from "../components/Organisms/MapArea";

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
      {targetMark(true)}
      <MapArea />
    </SliderTemplate>
  );
};

// const MapHeader = styled.img`
//   width: 100%;
// `;

// const MapArea = styled.div`
//   width: 100%;
// `;

const TargetDiv = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
`;
