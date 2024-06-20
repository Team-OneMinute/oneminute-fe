import styled from "styled-components";
import { Text } from "@/app/components/Atoms/Text";

interface Props {
  text: string;
}

export const Paragraph = (props: Props) => {
  const { text } = props;

  return (
    <SubTitleDiv>
      <Text text={text} size="medium" color="white" />
    </SubTitleDiv>
  );
};

const SubTitleDiv = styled.div`
  height: 100%;
  width: 100%;
`;
