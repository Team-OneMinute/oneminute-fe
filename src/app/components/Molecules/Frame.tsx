"use client";
import styled from "styled-components";
import { Image } from "@/app/components/Atoms/Image";

interface Props {
  frameType: string;
}

type FrameType = {
  [key: string]: string;
};

const FrameTypeMap: FrameType = {
  descFrame: "/frame001.png",
  mapFrame: "/frame002.png",
};

export const Frame = (props: Props) => {
  const { frameType } = props;
  return (
    <FrameComponent>
      <Image source={FrameTypeMap[frameType]} objFit="cover" />
    </FrameComponent>
  );
};

const FrameComponent = styled.div`
  width: 60%;
`;
