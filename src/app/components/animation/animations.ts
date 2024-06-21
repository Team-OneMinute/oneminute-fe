// components/animations.ts
import { keyframes } from "styled-components";

export const filmNoise = keyframes`
  0%, 100% {
    filter: none;
  }
  20%, 40%, 60%, 80% {
    filter: contrast(1.5) brightness(1.5) saturate(1.5);
  }
`;

export const glitch = keyframes`
  0% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  20% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(-5px, -5px);
  }
  40% {
    clip-path: inset(15% 0 70% 0);
    transform: translate(5px, 5px);
  }
  60% {
    clip-path: inset(30% 0 50% 0);
    transform: translate(-5px, 5px);
  }
  80% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(5px, -5px);
  }
  100% {
    clip-path: inset(70% 0 10% 0);
    transform: translate(-5px, -5px);
  }
`;
