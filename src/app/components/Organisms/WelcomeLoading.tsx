import { Loading } from "@/app/components/Molecules/Loading";
import { GameTitle } from "@/app/components/Molecules/GameTitle";
import { OneMinuteConfig } from "@/app/config/OneMinuteConfig";
import styled from "styled-components";

export function WelcomeLoading() {
  return (
    <>
      <TitleArea>
        <GameTitle text={OneMinuteConfig.SERVICE_NAME}/>
      </TitleArea>
      <Loading loadingType="movieLoading" source="/Loading.mp4" />
    </>
  );
}

const TitleArea = styled.div`
  height: 20%;
  width: 100%;
`;


      // {
      //   /* Hard cord style, because can't be in time first rendering */
      // }
      // <div style={{ color: "white", fontSize: "80px" }}>
      //   {OneMinuteConfig.SERVICE_NAME}
      // </div>;