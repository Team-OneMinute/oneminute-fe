// components/atoms/AnimationImage.tsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { filmNoise, glitch } from "@/app/components/animation/animations";

const RotatingImage = styled.img`
  width: 100%;
  height: 100%;

  &.noise {
    animation: ${filmNoise} 1s infinite;
  }

  &.glitch {
    animation: ${glitch} 0.3s infinite;
  }
`;

export const NoiseImage: React.FC<{ src: string }> = ({ src }) => {
const imageRef = useRef<HTMLImageElement>(null);

const applyEffect = (effect: string) => {
  if (imageRef.current) {
    imageRef.current.classList.add(effect);
    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.classList.remove(effect);
      }
    }, 200); // エフェクトの持続時間を設定
  }
};

const randomEffects = () => {
  setInterval(() => {
    applyEffect("noise");

    // ランダムでグリッチエフェクトを適用
    if (Math.random() > 0.3) {
      setTimeout(() => {
        applyEffect("glitch");
      }, 200); // ノイズのエフェクト後にグリッチを適用
    }
  }, Math.random() * 3000 + 2000); // 2秒から10秒の間隔でノイズエフェクトを適用
};

useEffect(() => {
  randomEffects();
}, []);

return (
  <div>
    <RotatingImage src={src} ref={imageRef} />
  </div>
);
};
