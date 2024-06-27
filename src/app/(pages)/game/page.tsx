"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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

export default function Game() {
  const [result, setResult] = useState<string | null>(null);
  const [randomNum, setRandomNum] = useState<number>(0);
  const [message, setMessage] = useState<string>("defaultMessage");
  const { goto } = usePageNavigate();
  const { finishGame } = useGameFinish();

  let renderer: THREE.WebGLRenderer;
  let composer: EffectComposer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let light: THREE.DirectionalLight;
  let texture: THREE.Texture;
  let floor: THREE.Mesh;
  let tileMaterial: THREE.MeshStandardMaterial;
  let tileGeometry: THREE.BoxGeometry;
  let raycaster: THREE.Raycaster;
  let touch: THREE.Vector2;
  let fontLoader: FontLoader;
  let font: Font;

  let count = 0;
  let startTime = 20 * 1000; // 20 seconds in milliseconds
  let startTimestamp = Date.now();
  let isTimeUp = false;
  let isTapTile = false;
  let movedDistance = 0;

  const tileConfig = {
    size: {
      x: 16,
      y: 2,
      z: 24,
    },
    moveSpeed: 13,
    space: 2,
  };
  const railConfig = {
    laneCount: 4,
    length: 260,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
  const railLineConfig = {
    color: 0xffffff,
    lineWidth: 2,
  };
  const railFloorConfig = {
    size: {
      x:
        tileConfig.size.x * railConfig.laneCount +
        railLineConfig.lineWidth * (railConfig.laneCount + 1),
      y: 1,
      z: railConfig.length,
    },
    color: 0xffffff,
  };

  const cameraConfig = {
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
  };

  let tiles: THREE.Mesh[] = [];
  let tileStartPositions: { x: number; y: number; z: number }[] = [];
  let textMesh: THREE.Mesh;
  let timeTextMesh: THREE.Mesh;
  let usedFont: Font;

  const fontUrl =
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"; // フォントのURL

  const handleStartClick = async () => {
    const randomNumber = Math.floor(Math.random() * 20000);
    setRandomNum(randomNumber);
    setResult(randomNumber > 10000 ? "You Win!" : "You Lose.");
    await finishGame("0001", randomNumber).then((message) => {
      setMessage(message);
    });
  };

  const handleRetryClick = () => {
    console.log("onClick retry");
  };

  const handleBackClick = () => {
    goto("/");
  };

  const initializeGame = () => {
    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = width / height;
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    scene = new THREE.Scene();

    // ポストプロセスの設定
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
    composer = new EffectComposer(renderer, renderTarget);

    camera = new THREE.PerspectiveCamera(
      cameraConfig.fov,
      width / height,
      1,
      9999
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

    // シーンのレンダリングパス
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // FXAAの設定
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms["resolution"].value.set(
      1 / (window.innerWidth * window.devicePixelRatio),
      1 / (window.innerHeight * window.devicePixelRatio)
    );
    composer.addPass(fxaaPass);

    raycaster = new THREE.Raycaster();
    touch = new THREE.Vector2();

    light = new THREE.DirectionalLight(0xffffff, 2);
    scene.add(light);

    makeRail();

    // texture = new THREE.TextureLoader().load("floor.png");
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // リピート可能に
    // texture.repeat.set(10, 100); // 10x10マスに設定
    // texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す
    // floor = new THREE.Mesh(
    //   new THREE.PlaneGeometry(200, 10000),
    //   new THREE.MeshStandardMaterial({
    //     map: texture,
    //     roughness: 0.0,
    //     metalness: 0.6,
    //   })
    // );
    // floor.name = "floor";
    // floor.rotation.x = -Math.PI / 2;
    // floor.receiveShadow = true; // 影の設定
    // scene.add(floor);

    // set tile start positions
    for (let i = 0; i < railConfig.laneCount; i++) {
      const tileStartPosition = {
        x:
          railConfig.position.x +
          railLineConfig.lineWidth +
          (tileConfig.size.x + railLineConfig.lineWidth) * i,
        y: railConfig.position.y,
        z: railConfig.position.z,
      };
      tileStartPositions.push(tileStartPosition);
    }

    tileMaterial = new THREE.MeshStandardMaterial({
      color: 0x22dd22,
      roughness: 0.1,
      metalness: 0.2,
    });
    tileGeometry = new THREE.BoxGeometry(
      tileConfig.size.x,
      tileConfig.size.y,
      tileConfig.size.z
    );

    fontLoader = new FontLoader();

    // makeText(formatNumber(count), "score");
    // makeText(formatTime(startTime), "time");

    for (let i = 0; i < 10; i++) {
      moveTile(tileConfig.size.z + tileConfig.space);
      const randomIndex = Math.floor(Math.random() * 1000) % 4;
      makeTile(randomIndex);
    }

    // TODO: remove before deploy prod
    const axesHelper = new THREE.AxesHelper(400);
    // scene.add(axesHelper);
  };

  const makeTile = (laneIndex: number) => {
    const tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.position.x =
      tileStartPositions[laneIndex].x + tileGeometry.parameters.width / 2;
    tile.position.y =
      tileStartPositions[laneIndex].y + tileGeometry.parameters.height / 2;
    tile.position.z =
      tileStartPositions[laneIndex].z + tileGeometry.parameters.depth / 2;
    tile.name = "tile";

    scene.add(tile);
    tiles.push(tile);
    movedDistance = 0;
  };

  const makeLine = (
    lineMaterial: THREE.MeshStandardMaterial,
    position: { x: number; y: number; z: number }
  ) => {
    const lineGeometry = new THREE.BoxGeometry(
      railLineConfig.lineWidth,
      railLineConfig.lineWidth,
      railConfig.length
    );
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.x = position.x + line.geometry.parameters.width / 2;
    line.position.y = position.y + line.geometry.parameters.height / 2;
    line.position.z = position.z + line.geometry.parameters.depth / 2;
    line.name = "line";
    scene.add(line);
  };

  const makeRail = () => {
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: railLineConfig.color,
    });

    const startXPoints = [];
    let startXPoint = railConfig.position.x;
    for (let i = 0; i < railConfig.laneCount + 1; i++) {
      startXPoints.push(startXPoint);
      startXPoint += railLineConfig.lineWidth;
      startXPoint += tileConfig.size.x;
    }

    for (let i = 0; i < startXPoints.length; i++) {
      const point = {
        x: startXPoints[i],
        y: railConfig.position.y,
        z: railConfig.position.z,
      };
      makeLine(lineMaterial, point);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().padStart(7, "0");
  };
  const formatTime = (ms: number) => {
    let seconds = Math.floor(ms / 1000);
    let milliseconds = ms % 1000;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(milliseconds).padStart(3, "0").substring(0, 2)}`;
  };
  const makeText = (text: string, type: "score" | "time") => {
    fontLoader.load(fontUrl, (font) => {
      usedFont = font;

      let textSize: number;
      let positionX: number;
      let positionY: number;
      let positionZ: number;
      switch (type) {
        case "score":
          textSize = 50;
          positionX = 28;
          positionY = 10;
          positionZ = -1100;
          break;
        case "time":
          textSize = 45;
          positionX = 28;
          positionY = 10;
          positionZ = -800;
          break;
        default:
          textSize = 50;
          positionX = 28;
          positionY = 10;
          positionZ = -1100;
      }
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: textSize,
        height: 10, // 立体感のための高さ
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(textGeometry, textMaterial);
      mesh.position.set(positionX, positionY, positionZ);
      mesh.rotation.x = (Math.PI / 180) * -5;
      mesh.rotation.y = (Math.PI / 180) * -40;
      scene.add(mesh);
      switch (type) {
        case "score":
          textMesh = mesh;
          break;
        case "time":
          timeTextMesh = mesh;
          break;
        default:
          textMesh = mesh;
      }
    });
  };

  const updateText = (text: string, type: "score" | "time") => {
    let textSize: number;
    switch (type) {
      case "score":
        textSize = 50;
        break;
      case "time":
        textSize = 45;
        break;
      default:
        textSize = 50;
    }
    const newTextGeometry = new TextGeometry(text, {
      font: usedFont,
      size: textSize,
      height: 10, // 立体感のための高さ
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    let mesh: THREE.Mesh;
    switch (type) {
      case "score":
        mesh = textMesh;
        // textMesh.geometry.dispose();
        // textMesh.geometry = newTextGeometry;
        break;
      case "time":
        mesh = timeTextMesh;
        // timeTextMesh.geometry.dispose();
        // timeTextMesh.geometry = newTextGeometry;
        break;
      default:
        mesh = textMesh;
      // textMesh.geometry.dispose();
      // textMesh.geometry = newTextGeometry;
    }
    mesh.geometry.dispose();
    mesh.geometry = newTextGeometry;
  };

  const onCubeClick = () => {
    count += 1;
    if (textMesh) {
      console.log("textMesh", textMesh);
      // updateText(formatNumber(count), "score");
    }
    isTapTile = true;
  };

  const onTouchStart = (event: TouchEvent) => {
    // スマホのタッチ位置を計算
    touch.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    touch.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

    // レイキャストを設定
    raycaster.setFromCamera(touch, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    const selectedBox = intersects.find((intersect) => {
      return intersect.object.name == "tile";
    });

    if (selectedBox) {
      // 立方体がクリックされたときのアクション
      console.log("intersects", intersects);
      onCubeClick();
    }
  };

  const moveTile = (distance: number) => {
    tiles.map((tile) => (tile.position.z += distance));
    movedDistance += distance;
    console.log("movedDistance", movedDistance);
  };
  const walk = () => {
    // 全てのタイルのzを進める
    if (movedDistance < tileConfig.size.z + tileConfig.space) {
      moveTile(tileConfig.moveSpeed);
    } else {
      // タイルをランダム生成する
      const randomIndex = Math.floor(Math.random() * 1000) % 4;
      makeTile(randomIndex);
      console.log("random", randomIndex);
      console.log("tilesNum", tiles.length);

      // フラグを戻す
      isTapTile = false;
    }
  };

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    let newTiles = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].position.z > 400) {
        scene.remove(tiles[i]);
      } else {
        newTiles.push(tiles[i]);
      }
    }
    tiles = newTiles;

    if (isTapTile) {
      walk();
    }

    // if (Math.random() > 0.9) {
    //   const newTile = makeTile();
    //   scene.add(newTile);
    //   tiles.push(newTile);
    // }
    // let elapsedTime = Date.now() - startTimestamp;
    // if (elapsedTime % 1000 == 0) {
    //   const newTile = makeTile(0);
    //   scene.add(newTile);
    //   tiles.push(newTile);
    // }
    // if (elapsedTime % 1500 == 0) {
    //   const newTile = makeTile(1);
    //   scene.add(newTile);
    //   tiles.push(newTile);
    // }
    // if (elapsedTime % 2000 == 0) {
    //   const newTile = makeTile(2);
    //   scene.add(newTile);
    //   tiles.push(newTile);
    // }
    // if (elapsedTime % 2500 == 0) {
    //   const newTile = makeTile(3);
    //   scene.add(newTile);
    //   tiles.push(newTile);
    // }
    // tiles.map((tile) => (tile.position.z += 0.1));

    // if (!isTimeUp && timeTextMesh != undefined) {
    //   let elapsedTime = Date.now() - startTimestamp; // スタート時からの経過時間
    //   let remainingTime = startTime - elapsedTime; // タイムリミット - 経過時間
    //   if (remainingTime > 0) {
    //     updateText(formatTime(remainingTime), "time");
    //   } else {
    //     updateText("00:00.00", "time");
    //     isTimeUp = true;
    //   }
    // }

    // レンダリング
    composer.render();
    requestAnimationFrame(tick);
  };

  useCustomEffect(() => {
    initializeGame();
    tick();

    window.addEventListener("touchstart", onTouchStart, false);

    return () => {
      document.getElementById("myCanvas")?.removeChild(renderer.domElement);
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <GameCanvas id="myCanvas" />
    </Box>
  );
}

const GameCanvas = styled.canvas`
  display: block;
  height: 100%;
  width: 100%;
`;
