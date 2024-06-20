"use client";
import styled from "styled-components";
import { OneMinuteConfig } from "@/app/config/OneMinuteConfig";
import { Title } from "@/app/components/Molecules/Title";

export const Header = () => {
  return (
    <HeaderContainer>
      <Title text={OneMinuteConfig.SERVICE_NAME} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 48px;
`;
