import { Camera, Scene } from "three";

export interface Game {
  // scene: Scene;
  // camera: Camera;

  execute: () => void;

  // onTap: (e: TouchEvent) => void;
}