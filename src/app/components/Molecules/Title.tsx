import styled from "styled-components";
import { Text } from "@/app/components/Atoms/Text";

interface Props {
  text: string;
}

export const Title = (props: Props) => {
  const { text } = props;

  return (
      <Text text={text} size="large" color="white" />
  );
};

