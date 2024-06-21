"use client";
import styled from "styled-components";
import { NoiseImage } from "@/app/components/Atoms/NoiseImage";

export const Human = () => {
  return (
    <HumanComponent>
      <NoiseImage src="/human1.png" />
    </HumanComponent>
  );
};

const HumanComponent = styled.div`
  width: 100%;
  padding: 0 4vw 0 4vw;
`;
