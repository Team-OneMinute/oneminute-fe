// components/atoms/Body.tsx
import React from "react";
import styled from "styled-components";

interface BodyProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({
  backgroundColor = "#000",
  children,
}) => {
  return <StyledBody $backgroundColor={backgroundColor}>{children}</StyledBody>;
};

const StyledBody = styled.div<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 8px;
`;
