import { Loading } from "@/app/components/Molecules/Loading";
import { GameTitle } from "@/app/components/Molecules/GameTitle";
import { OneMinuteConfig } from "@/app/config/OneMinuteConfig";
import styled from "styled-components";

export function WelcomeLoading() {
  return (
    <>
      <TitleArea>
        <GameTitle text={OneMinuteConfig.SERVICE_NAME} />
      </TitleArea>
      <LoadingArea>
        <Loading loadingType="movieLoading" source="/Loading.mp4" />
      </LoadingArea>
    </>
  );
}

const TitleArea = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
`;

const LoadingArea = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
`;