import styled from "styled-components";
import { Frame } from "@/app/components/Molecules/Frame";
import { Map } from "@/app/components/Molecules/Map";

export const MapArea = () => {
  return (
    <Component>
      <MapFrame>
        <Frame frameType={"mapFrame"} />
      </MapFrame>
      <MapComponent>
        <Map />
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
  width: 100%;
`;
