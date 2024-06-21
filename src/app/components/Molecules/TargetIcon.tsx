"use client";
import styled from "styled-components";
import { Image } from "@/app/components/Atoms/Image";

interface Props {
  isSelected: boolean;
  position: {
    x: number;
    y: number;
  };
  onClick: () => void;
}

type TargetType = {
  [key: string]: string;
};

const TargetTypeMap: TargetType = {
  selected: "/Target_red.svg",
  notSelected: "/target1.png",
};

export const TargetIcon = (props: Props) => {
  const { isSelected, position, onClick } = props;
  const targetType = isSelected ? "selected" : "notSelected";
  const size = isSelected ? 3 : 2;

  return (
    <TargetComponent
      x={position.x}
      y={position.y}
      size={size}
      onClick={onClick}
    >
      <Image source={TargetTypeMap[targetType]} />
    </TargetComponent>
  );
};

const TargetComponent = styled.div<{ x: number; y: number; size: number }>`
  position: absolute;
  ${(props) => {
    const halfSize = props.size / 2;
    return `
      left: calc(${props.x}% - ${halfSize}rem);
      top: calc(${props.y}% - ${halfSize}rem);
      height: ${props.size}rem;
      width: ${props.size}rem;
    `;
  }}
`;
