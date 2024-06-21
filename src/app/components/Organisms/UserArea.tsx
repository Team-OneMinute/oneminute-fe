"use client";
import styled from "styled-components";
import { Human } from "@/app/components/Molecules/Human";
import { SubTitle } from "../Molecules/SubTitle";

export const UserArea = () => {
  return (
    <UserComponent>
      <SubTitle text="Coming Soon..." />
      <Human />
    </UserComponent>
  );
};

const UserComponent = styled.div`
  width: 100%;
  padding: 0 4vw 0 4vw;
`;
