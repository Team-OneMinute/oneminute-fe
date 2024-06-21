"use client";
import styled from "styled-components";
import { Image } from "@/app/components/Atoms/Image";

export const Human = () => {
  return (
    <HumanComponent>
      <Image source="/human1.png" objFit="cover" />
    </HumanComponent>
  );
};

const HumanComponent = styled.div`
  width: 100%;
  padding: 0 4vw 0 4vw;
`;
