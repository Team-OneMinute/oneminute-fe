export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface CameraConfig {
  position: Coordinate;
  focusPosition: Coordinate;
  fov: number;
  near: number;
  far: number;
}

export interface LightConfig {
  color: number;
  intensity: number;
}