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
        return "16px"; // 16px
      case "medium":
        return "20px"; // 20px
      case "large":
        return "32px"; // 32px
      case "xlarge":
        return "80px"; // 48px
      default:
        return "20px";
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
    <TextDiv $fontSize={fontSize(size)} $fontColor={fontColor(color)}>
      {text}
    </TextDiv>
  );
};

const TextDiv = styled.div<{ $fontSize: string; $fontColor: string }>`
  color: ${(props) => props.$fontColor};
  font-size: ${(props) => props.$fontSize};
`;
