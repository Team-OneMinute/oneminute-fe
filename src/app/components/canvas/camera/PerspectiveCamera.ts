import { PerspectiveCamera, Vector3 } from "three";
import { CameraConfig } from "@/app/components/canvas/commonInterface";

export const setUpCamera = (width: number, height: number, config: CameraConfig) => {
    const camera = new PerspectiveCamera(
      config.fov,
      width / height,
      config.near,
      config.far
    );
    camera.position.x = config.position.x;
    camera.position.y = config.position.y;
    camera.position.z = config.position.z;
    camera.lookAt(
      new Vector3(
        config.focusPosition.x,
        config.focusPosition.y,
        config.focusPosition.z
      )
    );
    return camera;
}