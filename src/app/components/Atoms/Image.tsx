import styled from "styled-components";

type ObjectFitType = "cover" | "fill";

interface Props {
  source: string;
  objFit?: ObjectFitType;
  opacity?: number;
}

export const Image = (props: Props) => {
    const { source, objFit, opacity } = props;

    return (
        <ImageComponent src={source} $objFit={objFit} $opacity={opacity} />
    )
}

const ImageComponent = styled.img<{ $objFit?: string; $opacity?: number }>`
  width: 100%;
  height: 100%;
  ${(props) => props.$objFit && `object-fit: ${props.$objFit};`}
  opacity: ${(props) => props.$opacity ? `${props.$opacity}` : 1};
`;
