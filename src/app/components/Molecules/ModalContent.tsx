import React from "react";
import styled from "styled-components";
import { ModalHeader } from "./ModalHeader";
import { Body } from "@/app/components/Atoms/Body";
import { ModalFooter } from "./ModalFooter";

interface ModalContentProps {
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  headerBgColor?: string;
  bodyBgColor?: string;
  footerBgColor?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  title,
  children,
  actions,
  headerBgColor = "#000000",
  bodyBgColor = "#000000",
  footerBgColor = "#000000",
}) => {
  return (
    <StyledModalContent>
      <ModalHeader title={title} backgroundColor={headerBgColor} />
      <Body backgroundColor={bodyBgColor}>{children}</Body>
      <ModalFooter actions={actions} backgroundColor={footerBgColor} />
    </StyledModalContent>
  );
};

const StyledModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  overflow: hidden;
`;
