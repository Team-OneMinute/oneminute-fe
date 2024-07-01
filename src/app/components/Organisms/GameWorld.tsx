"use client";
import styled from "styled-components";
import React, { Dispatch, SetStateAction, useRef } from "react";
import * as THREE from "three";
import { useCustomEffect } from "@/app/hooks/infrastructure/useCustomEffect";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Props {
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
  gameList: { gameId: string; description: string }[];
  setSelectedGameId: Dispatch<SetStateAction<string>>;
}

export default function GameWorld(props: Props) {
  const gameList = props.gameList;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let directionalLight: THREE.DirectionalLight;
  let raycaster: THREE.Raycaster;
  let touch: THREE.Vector2;
  let selectedObject: THREE.Object3D | null = null;

  // TODO: props
  const worldConfig = {
    width: 375,
    height: 346,
    top: 15, // from window top px
    left: 134.4, // from window left px
  };

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

  const gameGateConfig = {
    radius: 4,
    detail: 0,
    distance: 30,
    selectedColor: 0xff0000,
    nonSelectedColor: 0xffffff,
  };

  const createStarDust = () => {
    const vertices = [];

    for (let i = 0; i < starDustConfig.stars; i++) {
      const x = 100 * (Math.random() - 0.5);
      const y = 100 * (Math.random() - 0.5);
      const z = 100 * (Math.random() - 0.5);
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

  const createStar = () => {
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
  };

  const createGameGate = (
    isFirst: boolean,
    position: number[],
    gameId: string
  ) => {
    const octahedronGeometry = new THREE.OctahedronGeometry(
      gameGateConfig.radius,
      gameGateConfig.detail
    );

    let material: THREE.MeshPhysicalMaterial;

    if (isFirst) {
      material = new THREE.MeshPhysicalMaterial({
        color: gameGateConfig.selectedColor,
      });
    } else {
      material = new THREE.MeshPhysicalMaterial({
        color: gameGateConfig.nonSelectedColor,
      });
    }

    const gameGate = new THREE.Mesh(octahedronGeometry, material);
    gameGate.position.x = position[0];
    gameGate.position.y = position[1];
    gameGate.position.z = position[2];

    gameGate.rotation.x = Math.PI / 4;
    gameGate.rotation.y = Math.PI / 4;
    gameGate.rotation.z = Math.PI / 4;
    gameGate.name = `GameGate${gameId}`;
    scene.add(gameGate);

    if (isFirst) {
      selectedObject = gameGate;
    }
  };

  const createDirectionalLight = () => {
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = 0;
    directionalLight.position.y = 50;
    directionalLight.position.z = 100;
    scene.add(directionalLight);
  };

  const createGameGatePosition = (gameSize: number) => {
    const positions = [];
    const halfNumObjects = Math.ceil(gameSize / 2); // 上半球と下半球に分割するために切り上げる
    const angleIncrement = (2 * Math.PI) / halfNumObjects;

    // Upper hemisphere
    for (let i = 0; i < halfNumObjects; i++) {
      const theta = i * angleIncrement;
      const x = gameGateConfig.distance * Math.cos(theta);
      const z = gameGateConfig.distance * Math.sin(theta);
      const y = gameGateConfig.distance / 2; // Adjust for upper hemisphere
      positions.push([x, y, z]);
    }

    // Lower hemisphere
    for (let i = 0; i < gameSize - halfNumObjects; i++) {
      const theta = i * angleIncrement;
      const x = gameGateConfig.distance * Math.cos(theta);
      const z = gameGateConfig.distance * Math.sin(theta);
      const y = -gameGateConfig.distance / 2; // Adjust for lower hemisphere
      positions.push([x, y, z]);
    }

    return positions;
  };

  const createCamera = () => {
    camera = new THREE.PerspectiveCamera(
      45,
      worldConfig.width / worldConfig.height
    );
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
  };

  const createRender = () => {
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(worldConfig.width, worldConfig.height);
  };

  const addHelper = () => {
    const axesHelper = new THREE.AxesHelper(40);
    scene.add(axesHelper);
  };

  const createControls = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();
  };

  const createRaycaster = () => {
    raycaster = new THREE.Raycaster();
    touch = new THREE.Vector2();
  };

  const init = () => {
    scene = new THREE.Scene();

    createCamera();
    createRender();

    addHelper();
    
    createDirectionalLight();
    createStar();
    createStarDust();

    const positions = createGameGatePosition(gameList.length);
    positions.forEach((position, index) => {
      const isFirst = index === 0 ? true : false;
      createGameGate(isFirst, position, gameList[index].gameId);
    });

    createRaycaster();

    createControls();
  };

  const switchSelectedGameGate = (object: THREE.Object3D) => {
    if (selectedObject) {
      if (
        selectedObject instanceof THREE.Mesh &&
        selectedObject.material instanceof THREE.MeshPhysicalMaterial
      ) {
        selectedObject.material.color.set(gameGateConfig.nonSelectedColor);
      }
    }
    if (
      object instanceof THREE.Mesh &&
      object.material instanceof THREE.MeshPhysicalMaterial
    ) {
      object.material.color.set(gameGateConfig.selectedColor);
      selectedObject = object;
    }
  };

  const onGameGateClick = (selectedGameId: string, object: THREE.Object3D) => {
    props.setSelectedGameId(selectedGameId);
    switchSelectedGameGate(object);
  };

  const onTouchStart = (event: TouchEvent) => {
    touch.x =
      ((event.touches[0].clientX - worldConfig.top) / worldConfig.width) * 2 -
      1;
    touch.y =
      -((event.touches[0].clientY - worldConfig.left) / worldConfig.height) *
        2 +
      1;

    // レイキャストを設定
    raycaster.setFromCamera(touch, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);
    const selectedBox = intersects.find((intersect) => {
      return intersect.object.name.startsWith("GameGate");
    });

    if (selectedBox) {
      const selectedBoxId = selectedBox.object.name.replace("GameGate", "");
      onGameGateClick(selectedBoxId, selectedBox.object);
    }
  };

  useCustomEffect(() => {
    init();
    tick();
    //addEvent();
    canvasRef.current!.addEventListener("touchstart", props.handleTouchStart);
    canvasRef.current!.addEventListener("touchstart", onTouchStart, false);
    canvasRef.current!.addEventListener("touchend", props.handleTouchEnd);
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
