import styled from "styled-components";
import { Text } from "@/app/components/Atoms/Text";

interface Props {
  text: string;
}

export const GameTitle = (props: Props) => {
  const { text } = props;

  return (
    <Titlediv>
      <Text text={text} size="xlarge" color="white" />
    </Titlediv>
  );
};

const Titlediv = styled.div`
  height: 100%;
  width: 100%;
`;
