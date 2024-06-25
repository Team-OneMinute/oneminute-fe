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
  let count = 0;
  let startTime = 20 * 1000; // 20 seconds in milliseconds
  let startTimestamp = Date.now();

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

  useCustomEffect(() => {
    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = width / height;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height);
    // レンダラー側で影を有効に
    renderer.shadowMap.enabled = true;

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 9999);
    camera.position.x = 0;
    camera.position.y = 400;
    camera.position.z = 865;
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 100, 0));

    // 光源を作成
    {
      const spotLight = new THREE.SpotLight(
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
    }

    // 地面を作成
    const texture = new THREE.TextureLoader().load("floor.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // リピート可能に
    texture.repeat.set(10, 100); // 10x10マスに設定
    texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す

    const floor = new THREE.Mesh(
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

    // パネルを作成
    const material = new THREE.MeshStandardMaterial({
      color: 0x22dd22,
      roughness: 0.1,
      metalness: 0.2,
    });
    const geometry = new THREE.BoxGeometry(45, 2, 45);

    const makeBox = () => {
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.round((Math.random() - 0.5) * 19) * 10;
      box.position.y = 4;
      box.position.z = -2500;
      box.name = "box";
      return box as THREE.Mesh;
    };

    // パネルを複数作成しランダムに配置
    let boxs: THREE.Mesh[] = [];
    for (let i = 0; i < 60; i++) {
      const box = makeBox();
      boxs.push(box);
      scene.add(box);
    }

    // レイキャストを作成
    const raycaster = new THREE.Raycaster();
    const touch = new THREE.Vector2();

    let textMesh: THREE.Mesh;
    let timeTextMesh: THREE.Mesh;
    let usedFont: Font;
    const fontLoader = new FontLoader();
    const fontUrl =
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"; // フォントのURL
    fontLoader.load(fontUrl, (font) => {
      usedFont = font;
      const textGeometry = new TextGeometry(formatNumber(count), {
        font: font,
        size: 50,
        height: 10, // 立体感のための高さ
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      // textMesh.position.set(300, 400, -600);
      textMesh.position.set(28, 10, -1100);
      textMesh.rotation.x = (Math.PI / 180) * -5;
      textMesh.rotation.y = (Math.PI / 180) * -40;
      scene.add(textMesh);
    });
    const onCubeClick = () => {
      count += 1;
      if (textMesh) {
        console.log("textMesh", textMesh);
        const newTextGeometry = new TextGeometry(formatNumber(count), {
          font: usedFont,
          size: 50,
          height: 10, // 立体感のための高さ
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });
        textMesh.geometry.dispose();
        textMesh.geometry = newTextGeometry;
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

    const createText = (text: string) => {
      if (timeTextMesh) scene.remove(timeTextMesh);

      const geometry = new TextGeometry(text, {
        font: usedFont,
        size: 45,
        height: 10, // 立体感のための高さ
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      timeTextMesh = new THREE.Mesh(geometry, material);
      timeTextMesh.position.set(28, 10, -800);
      timeTextMesh.rotation.x = (Math.PI / 180) * -5;
      timeTextMesh.rotation.y = (Math.PI / 180) * -40;
      scene.add(timeTextMesh);
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
      // boxs = boxs.map((box) => {
      //   if (box.position.z > 865) {
      //     scene.remove(box);
      //   } else {
      //     return box;
      //   }
      // });
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

      let elapsedTime = Date.now() - startTimestamp;
      let remainingTime = startTime - elapsedTime;

      if (remainingTime <= 0) {
        createText("00:00.00");
      } else {
        createText(formatTime(remainingTime));
      }

      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    window.addEventListener("touchstart", onTouchStart, false);

    return () => {
      document.getElementById("game-canvas")?.removeChild(renderer.domElement);
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
