import React from "react";
import styled from "styled-components";
import { Backdrop } from "@/app/components/Atoms/Backdrop";
import { ModalContent } from "@/app/components/Molecules/ModalContent";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  headerBgColor?: string;
  bodyBgColor?: string;
  footerBgColor?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  headerBgColor = "#f5f5f5",
  bodyBgColor = "#fff",
  footerBgColor = "#f5f5f5",
}) => {
  if (!isOpen) return null;

  return (
    <StyledModal>
      <Backdrop onClick={onClose} />
      <ModalContent
        title={title}
        headerBgColor={headerBgColor}
        bodyBgColor={bodyBgColor}
        footerBgColor={footerBgColor}
        actions={actions}
      >
        {children}
      </ModalContent>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
