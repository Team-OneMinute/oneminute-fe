"use client";
import styled from "styled-components";
import { SliderTemplate } from "../components/Templates/SliderTemplate";
import { Paragraph } from "../components/Molecules/Paragraph";
import { SubTitle } from "../components/Molecules/SubTitle";
import { Title } from "../components/Molecules/Title";

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
      <Title text="Hello" />
      <SubTitle text="Hello" />
      <Paragraph text="HELLO" />
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
