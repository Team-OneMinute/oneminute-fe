import styled from "styled-components";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant =
  | "whiteOutline"
  | "whiteFilled"
  | "blackOutline"
  | "blackFilled";

interface Props {
  size: ButtonSize;
  variant: ButtonVariant;
}

export const ButtonBase = (props: Props) => {
  const { size, variant } = props;

  const buttonImages = {
    whiteOutline: "/button/white-outline.png",
    whiteFilled: "/button/white-filled.png",
    blackOutline: "/button/black-outline.png",
    blackFilled: "/button/black-filled.png",
  };

  const padding = (size: ButtonSize) => {
    switch (size) {
      case "small":
        return "15px 27px";
      case "medium":
        return "23px 42px";
      case "large":
        return "35px 63px";
      default:
        return "23px 42px";
    }
  };

  return (
    <Button
      $padding={padding(size)}
      $backgroundImage={buttonImages[variant]}
    />
  );
};

const Button = styled.div<{
  $padding: string;
  $backgroundImage: string;
}>`
  display: inline-block;
  padding: ${(props) => props.$padding};
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
`;
