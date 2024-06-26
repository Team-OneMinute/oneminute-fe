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

export default function Game() {
  const [result, setResult] = useState<string | null>(null);
  const [randomNum, setRandomNum] = useState<number>(0);
  const [message, setMessage] = useState<string>("defaultMessage");
  const { goto } = usePageNavigate();
  const { finishGame } = useGameFinish();

  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let spotLight: THREE.SpotLight;
  let texture: THREE.Texture;
  let floor: THREE.Mesh;
  let material: THREE.MeshStandardMaterial;
  let geometry: THREE.BoxGeometry;
  let raycaster: THREE.Raycaster;
  let touch: THREE.Vector2;
  let fontLoader: FontLoader;
  let font: Font;

  let count = 0;
  let startTime = 20 * 1000; // 20 seconds in milliseconds
  let startTimestamp = Date.now();
  let isTimeUp = false;

  let boxs: THREE.Mesh[] = [];
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
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(30, width / height, 1, 9999);
    camera.position.x = 0;
    camera.position.y = 400;
    camera.position.z = 865;
    camera.lookAt(new THREE.Vector3(0, 100, 0));

    raycaster = new THREE.Raycaster();
    touch = new THREE.Vector2();

    spotLight = new THREE.SpotLight(
      0xffffff,
      200,
      20000,
      Math.PI / 5,
      0.2,
      0.5
    );
    spotLight.position.set(0, 10000, 0);
    spotLight.castShadow = true; // 影を落とす設定
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);

    texture = new THREE.TextureLoader().load("floor.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // リピート可能に
    texture.repeat.set(10, 100); // 10x10マスに設定
    texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す
    floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 10000),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.0,
        metalness: 0.6,
      })
    );
    floor.name = "floor";
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true; // 影の設定
    scene.add(floor);

    material = new THREE.MeshStandardMaterial({
      color: 0x22dd22,
      roughness: 0.1,
      metalness: 0.2,
    });
    geometry = new THREE.BoxGeometry(45, 2, 45);

    fontLoader = new FontLoader();

    makeText(formatNumber(count), "score");
    makeText(formatTime(startTime), "time");
  };

  const makeBox = () => {
    const box = new THREE.Mesh(geometry, material);
    box.position.x = Math.round((Math.random() - 0.5) * 19) * 10;
    box.position.y = 4;
    box.position.z = -2500;
    box.name = "box";
    return box as THREE.Mesh;
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
      updateText(formatNumber(count), "score");
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    // スマホのタッチ位置を計算
    touch.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    touch.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

    // レイキャストを設定
    raycaster.setFromCamera(touch, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    const selectedBox = intersects.find((intersect) => {
      return intersect.object.name == "box";
    });

    if (selectedBox) {
      // 立方体がクリックされたときのアクション
      console.log("intersects", intersects);
      onCubeClick();
    }
  };

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    let newBoxs = [];
    for (let i = 0; i < boxs.length; i++) {
      if (boxs[i].position.z > 865) {
        scene.remove(boxs[i]);
      } else {
        newBoxs.push(boxs[i]);
      }
    }
    boxs = newBoxs;
    if (Math.random() > 0.9) {
      const newBox = makeBox();
      scene.add(newBox);
      boxs.push(newBox);
    }
    boxs.map((box) => (box.position.z += 5));

    if (!isTimeUp && timeTextMesh != undefined) {
      let elapsedTime = Date.now() - startTimestamp; // スタート時からの経過時間
      let remainingTime = startTime - elapsedTime; // タイムリミット - 経過時間
      if (remainingTime > 0) {
        updateText(formatTime(remainingTime), "time");
      } else {
        updateText("00:00.00", "time");
        isTimeUp = true;
      }
    }

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  useCustomEffect(() => {
    initializeGame();

    // パネルを複数作成しランダムに配置
    // for (let i = 0; i < 60; i++) {
    //   const box = makeBox();
    //   boxs.push(box);
    //   scene.add(box);
    // }

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
