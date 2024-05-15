"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import * as THREE from "three";

export default function Game() {
    const [result, setResult] = useState<string | null>(null);
    const [randomNum, setRandomNum] = useState<number>(0);

  const handleStartClick = () => {
      const randomNumber = Math.floor(Math.random() * 20000);
      setRandomNum(randomNumber);
    setResult(randomNumber > 10000 ? "You Win!" : "You Lose.");
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("game-canvas")?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.getElementById("game-canvas")?.removeChild(renderer.domElement);
    };
  }, []);

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
        padding: "20px",
      }}
    >
      <Button
        variant="contained"
        sx={{ marginBottom: "20px" }}
        onClick={handleStartClick}
      >
        START
      </Button>
      {result && (
        <>
          <Typography variant="h4">{result}</Typography>
          <Typography variant="h4">{`randomNum: ${randomNum}`}</Typography>
        </>
      )}

      <Box id="game-canvas" sx={{ width: "100%", height: "100%" }}></Box>
    </Box>
  );
}
