import { DirectionalLight, Scene } from "three";
import { LightConfig } from "../commonInterface";

export const createLight = (scene: Scene, config: LightConfig) => {
  const light = new DirectionalLight(config.color, config.intensity);
  scene.add(light);
};
