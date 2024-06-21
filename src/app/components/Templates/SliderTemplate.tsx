import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

export const SliderTemplate = (props: Props) => {
    return <SliderComponent>{props.children}</SliderComponent>;
}

const SliderComponent = styled.div`
  height: 100%;
  width: 100%;
  padding: calc(11vh + 20px + 2px) 4vw 4vh 4vw;
`;
