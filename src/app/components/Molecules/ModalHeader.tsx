import React from "react";
import styled from "styled-components";
import { Text } from "@/app/components/Atoms/Text";

interface ModalHeaderProps {
  title: string;
  backgroundColor?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  backgroundColor = "#f5f5f5",
}) => {
  return (
    <StyledHeader $backgroundColor={backgroundColor}>
      <Text size="large" color="white" text={title}/>
    </StyledHeader>
  );
};

const StyledHeader = styled.div<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  padding: 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;
