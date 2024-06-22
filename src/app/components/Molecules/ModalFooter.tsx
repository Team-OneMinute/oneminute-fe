import React from "react";
import styled from "styled-components";

interface ModalFooterProps {
  actions: React.ReactNode;
  backgroundColor?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  actions,
  backgroundColor = "#000000",
}) => {
  return (
    <StyledFooter $backgroundColor={backgroundColor}>{actions}</StyledFooter>
  );
};

const StyledFooter = styled.div<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  padding: 16px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
