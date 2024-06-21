import styled from "styled-components";
import { Frame } from "@/app/components/Molecules/Frame";
import { Map } from "@/app/components/Molecules/Map";
import { TargetIcon } from "../Molecules/TargetIcon";

export const MapArea = () => {
  return (
    <Component>
      <MapFrame>
        <Frame frameType={"mapFrame"} />
      </MapFrame>
      <MapComponent>
        <Map />
        <TargetIcon isSelected position={{ x: 50, y: 50 }} />
        <TargetIcon isSelected={false} position={{ x: 0, y: 0 }} />
        <TargetIcon isSelected={false} position={{ x: 100, y: 100 }} />
      </MapComponent>
    </Component>
  );
};

const Component = styled.div`
  height: 100%
  width: 100%;
`;

const MapFrame = styled.div`
  width: 100%;
`;

const MapComponent = styled.div`
  position: relative;
  width: 100%;
`;
