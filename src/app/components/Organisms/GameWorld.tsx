"use client";
import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import * as THREE from "three";
import { useCustomEffect } from "@/app/hooks/infrastructure/useCustomEffect";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Props {
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
}

export default function GameWorld(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;

  const cameraConfig = {
    position: {
      x: 0,
      y: 0,
      z: 100,
    },
    focusPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
    fov: 110,
  };

  const starConfig = {
    position: {
      x: 0,
      y: 0,
      z: 100,
    },
    radius: 30,
    widthSegments: 15,
    heightSegments: 15,
  };

  const starDustConfig = {
    stars: 60,
    size: 1,
    colors: 0xffffff,
  };

  const createStarDust = () => {
    // 座標のランダム生成
    const vertices = [];

    for (let i = 0; i < starDustConfig.stars; i++) {
      const x = 120 * (Math.random() - 0.5);
      const y = 120 * (Math.random() - 0.5);
      //const z = (Math.random() - 0.5);
      const z = -40;

      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
      size: starDustConfig.size,
      color: starDustConfig.colors,
    });

    const starDust = new THREE.Points(geometry, material);
    scene.add(starDust);
  };

  const init = () => {
    const width = 375;
    const height = 346;
    const rot = 0;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.x = cameraConfig.position.x;
    camera.position.y = cameraConfig.position.y;
    camera.position.z = cameraConfig.position.z;
    camera.lookAt(
      new THREE.Vector3(
        cameraConfig.focusPosition.x,
        cameraConfig.focusPosition.y,
        cameraConfig.focusPosition.z
      )
    );

    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
      antialias: true,
    });

    const axesHelper = new THREE.AxesHelper(40);
    scene.add(axesHelper);

    const sphereGeometry = new THREE.SphereGeometry(
      starConfig.radius,
      starConfig.widthSegments,
      starConfig.heightSegments
    );
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    createStarDust();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
  };

  useCustomEffect(() => {
    init();
    tick();
    canvasRef.current!.addEventListener("touchstart", props.handleTouchStart);
    canvasRef.current!.addEventListener("touchend", props.handleTouchEnd);
    //window.addEventListener("touchstart", onTouchStart, false);
  });

  const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  return <GameCanvas ref={canvasRef} id="myCanvas" />;
}

const GameCanvas = styled.canvas`
  display: block;
  height: 100%;
  width: 100%;
`;
