// components/atoms/AnimationImage.tsx
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

export const filmNoise = keyframes`
  0%, 100% {
    filter: none;
  }
  20%, 40%, 60%, 80% {
    filter: contrast(1.5) brightness(1.5) saturate(1.5);
  }
`;

export const distort1 = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: skewX(30deg) skewY(30deg);
  }
`;

export const distort2 = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: skewX(-30deg) skewY(-30deg);
  }
`;

const RotatingImage = styled.img`
  width: 100%;
  height: 100%;

  &.noise {
    animation: ${filmNoise} 0.5s infinite;
  }

  &.distort1 {
    animation: ${distort1} 0.1s linear;
  }

  &.distort2 {
    animation: ${distort2} 0.1s linear;
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
      }, 100);
    }
  };

  const randomEffects = () => {
    setInterval(() => {
      applyEffect("noise");

      if (Math.random() > 0.5) {
        const distortEffect = Math.random() > 0.5 ? "distort1" : "distort2";
        setTimeout(() => {
          applyEffect(distortEffect);
        }, 100);
      }
    }, Math.random() * 5000 + 1000);
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
