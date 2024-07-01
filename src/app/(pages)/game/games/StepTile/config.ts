import { CameraConfig, LightConfig } from "@/app/components/canvas/commonInterface";

export const GAME_CANVAS_ID = "gameCanvas";

export const railLineConfig = {
  color: 0xffffff,
  lineWidth: 2,
};

export const tileConfig = {
  size: {
    x: 16,
    y: 2,
    z: 24,
  },
  moveSpeed: 13,
  space: 2,
  color: 0x22dd22,
};

export const railConfig = {
  laneCount: 4,
  length: 260,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
};

export const railFloorConfig = {
  size: {
    x:
      tileConfig.size.x * railConfig.laneCount +
      railLineConfig.lineWidth * (railConfig.laneCount + 1),
    y: 1,
    z: railConfig.length,
  },
  color: 0xffffff,
};

export const cameraConfig: CameraConfig = {
  position: {
    x: railFloorConfig.size.x / 2,
    y: 65,
    z: 270,
  },
  focusPosition: {
    x: railFloorConfig.size.x / 2,
    y: 0,
    z: 180,
  },
  fov: 110,
  near: 1,
  far: 9999,
};

export const lightConfig: LightConfig = {
  color: 0xffffff,
  intensity: 2,
};