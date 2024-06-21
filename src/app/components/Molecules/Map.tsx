"use client";
import styled from "styled-components";
import { Image } from "@/app/components/Atoms/Image";

export const Map = () => {
  return (
    <MapComponent>
      <Image source="/map.webp" objFit="cover" />
    </MapComponent>
  );
};

const MapComponent = styled.div`
  width: 100%;
  padding: 0 4vw 0 4vw;
`;
