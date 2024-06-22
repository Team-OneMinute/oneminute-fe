import React from "react";
import styled from "styled-components";
import { ButtonBase } from "@/app/components/Atoms/ButtonBase";
import { Text } from "@/app/components/Atoms/Text";

interface ButtonProps {
  size: "small" | "medium" | "large";
  variant: "whiteOutline" | "whiteFilled" | "blackOutline" | "blackFilled";
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  text,
  onClick,
}) => {
  return (
    <ButtonArea onClick={onClick}>
      <ButtonBase size={size} variant={variant} />
      <ButtonText>
        <Text size={size} color={variant.includes("black") ? "white" : "black"} text={ text} />
      </ButtonText>
    </ButtonArea>
  );
};

const ButtonArea = styled.div`
  position: relative;
  display: inline-block;
  z-index: 5;
`;

const ButtonText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; /* ボタンのクリックイベントをテキストがブロックしないように */
`;
