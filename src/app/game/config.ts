export const GAME_CANVAS_ID = "gameCanvas"

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}


export interface TextConfig {
  position: Coordinate;
  rotation: Coordinate;
  size: number;
  depth: number;
  color: number;
  fontUrl: string;
  isCenter: boolean;
}

