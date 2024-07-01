import { WebGLRenderer } from "three";

export const setUpRenderer = (
  canvasTagId: string,
  width: number,
  height: number,
  ratio: number
) => {
  const renderer = new WebGLRenderer({
    canvas: document.querySelector(`#${canvasTagId}`) as HTMLCanvasElement,
    antialias: true,
  });
  renderer.setPixelRatio(ratio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  return renderer;
};
