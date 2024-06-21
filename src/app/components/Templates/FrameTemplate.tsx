import styled from "styled-components";
import { Image } from "@/app/components/Atoms/Image";

interface Props {
  frameType: string;
  height: string;
  width: string;
  children: React.ReactNode;
}

interface FrameInfo {
  imageUrl: string;
  backGroundStyle: string;
  childrenStyle: string;
}

type FrameType = {
  [key: string]: FrameInfo;
};

const FrameInfoMap: FrameType = {
  "001": {
    imageUrl: "/frame001.png",
    backGroundStyle: `
      padding-left: 4%;
    `,
    childrenStyle: `
      padding: 10% 7% 10% 13%;
      overflow: scroll;
    `,
  },
  "002": {
    imageUrl: "/frame3.png",
    backGroundStyle: ``,
    childrenStyle: `
    `,
  },
};

export const FrameTemplate = (props: Props) => {
  const frameInfo = FrameInfoMap[props.frameType];
  return (
    <FrameArea height={props.height} width={props.width}>
      <BackGroundImageArea backGroundStyle={frameInfo.backGroundStyle}>
        <Image source={frameInfo.imageUrl} objFit="fill" />
      </BackGroundImageArea>
      <ChildrenArea childrenStyle={frameInfo.childrenStyle}>
        {props.children}
      </ChildrenArea>
    </FrameArea>
  );
};

const FrameArea = styled.div<{
  height: string;
  width: string;
}>`
  ${(props) => {
    return `
        height: ${props.height};
        width: ${props.width};
    `;
  }}
  position: relative;
`;

const BackGroundImageArea = styled.div<{ backGroundStyle: string }>`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  ${(props) => props.backGroundStyle}
`;

const ChildrenArea = styled.div<{ childrenStyle: string }>`
  z-index: 3;
  height: 100%;
  width: 100%;
  ${(props) => props.childrenStyle}
`;
