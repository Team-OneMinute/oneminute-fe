import { Text } from "@/app/components/Atoms/Text";

interface Props {
  text: string;
}

export const Paragraph = (props: Props) => {
  const { text } = props;

  return (
      <Text text={text} size="medium" color="white" />
  );
};

