import styled from "styled-components";

type TextSize = "small" | "medium" | "large" | "xlarge";
type TextColor = "black" | "white" | "gray";

interface Props {
  text: string;
  size: TextSize;
  color: TextColor;
}

export const Text = (props: Props) => {
  const { text, size, color } = props;

  const fontSize = (size: TextSize) => {
    switch (size) {
      case "small":
        return "1rem"; // 16px
      case "medium":
        return "1.25rem"; // 20px
      case "large":
        return "2rem"; // 32px
      case "xlarge":
        return "3rem"; // 48px
      default:
        return "1.25rem";
    }
  };

  const fontColor = (color: TextColor) => {
    switch (color) {
      case "black":
        return "#000000";
      case "white":
        return "#FFFFFF";
      case "gray":
        return "#828282";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <TextDiv fontSize={fontSize(size)} fontColor={fontColor(color)}>
      {text}
    </TextDiv>
  );
};

const TextDiv = styled.div<{ fontSize: string, fontColor: string }>`
  height: 100%;
  width: 100%;
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize};
  text-family: Iceland;
`;
