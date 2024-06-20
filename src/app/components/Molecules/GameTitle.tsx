import { Text } from "@/app/components/Atoms/Text";

interface Props {
  text: string;
}

export const GameTitle = (props: Props) => {
  const { text } = props;

  return (
      <Text text={text} size="xlarge" color="white" />
  );
};
