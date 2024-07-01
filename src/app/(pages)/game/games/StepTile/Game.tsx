"use client";
import React from "react";
import { Box } from "@mui/material";
import * as THREE from "three";
import { useCustomEffect } from "@/app/hooks/infrastructure/useCustomEffect";
import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { useGameFinish } from "@/app/hooks/service/useGameFinish";
import styled from "styled-components";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import {
  GAME_CANVAS_ID,
  cameraConfig,
} from "@/app/(pages)/game/games/StepTile/config";
import { StepTile } from "@/app/game/scripts/StepTile";
import { Game as BaseGame } from "@/app/game/scripts/Game";
import { setUpRenderer } from "@/app/components/canvas/renderer/WebGLRenderer";
import { setUpCamera } from "@/app/components/canvas/camera/PerspectiveCamera";
import { setUpRaycaster } from "@/app/components/canvas/raycaster/Raycaster";
import { onTouch } from "./Script";

export const Game: React.FC = () => {
  let renderer: THREE.WebGLRenderer;
  let composer: EffectComposer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let light: THREE.DirectionalLight;

  let game: BaseGame;
  let gameWorldWidth: number;
  let gameWorldHeight: number;
  let devicePixelRatio: number;

  let raycaster: THREE.Raycaster;

  const init = () => {
    // renderer setting
    // renderer = new THREE.WebGLRenderer({
    //   canvas: document.querySelector(`#${GAME_CANVAS_ID}`) as HTMLCanvasElement,
    //   antialias: true,
    // });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    renderer = setUpRenderer(
      GAME_CANVAS_ID,
      gameWorldWidth,
      gameWorldHeight,
      devicePixelRatio
    );
    scene = new THREE.Scene();

    // get game object // TODO: get Game by gameId
    camera = setUpCamera(window.innerWidth, window.innerHeight, cameraConfig);
    raycaster = setUpRaycaster();
    
    game = new StepTile(scene);
    console.log("finish construct StepTitle");

    // anti alias
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
    composer = new EffectComposer(renderer, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms["resolution"].value.set(
      1 / (window.innerWidth * window.devicePixelRatio),
      1 / (window.innerHeight * window.devicePixelRatio)
    );
    composer.addPass(fxaaPass);
  };

  const animate = () => {
    game.execute();

    // rendering
    composer.render();
    requestAnimationFrame(animate);
  };

  const onTileClick = () => {
    console.log("onTileClick");
    // this.score += 1;
    // this.updateText(this.formatNumber(this.score), "score");
    // this.isTapTile = true;
  };

  const onTouchHandler = (e: TouchEvent) => {
    return onTouch(e, onTileClick, "tile", gameWorldWidth, gameWorldHeight, raycaster, camera, scene);
  };

  useCustomEffect(() => {
    console.log("useEffect");
    gameWorldWidth = window.innerWidth;
    gameWorldHeight = window.innerHeight;
    devicePixelRatio = window.devicePixelRatio;
    init();
    animate();

    // add event listener
    window.addEventListener("touchstart", onTouchHandler, false);

    return () => {
      document.getElementById(GAME_CANVAS_ID)?.removeChild(renderer.domElement);
    };
  });

  return <GameCanvas id={GAME_CANVAS_ID} />;
};

const GameCanvas = styled.canvas`
  display: block;
  height: 100%;
  width: 100%;
`;
