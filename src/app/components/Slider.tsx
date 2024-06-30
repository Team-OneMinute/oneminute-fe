"use client";
import styled from "styled-components";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "@/app/styles/swiper.css";

// slide
import { EarnSlide } from "@/app/slides/EarnSlide";
import { UserSlide } from "@/app/slides/UserSlide";
import { InviteSlide } from "@/app/slides/InviteSlide";
import { GameSlide } from "@/app/slides/GameSlide";
import { Header } from "./Organisms/Header";
import { useRef } from "react";
const slideName = ["GAME", "EARN", "USER", "INVITE"];

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: any) {
    return `<div class="${className}"> ${slideName[index]} </div>`;
  },
};

export const Slider = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const handleTouchStart = () => {
    if (swiperRef.current) {
      console.log("handleTouchStart");
      swiperRef.current.allowTouchMove = false;
    }
  };

  const handleTouchEnd = () => {
    if (swiperRef.current) {
      console.log("handleTouchEnd");
      swiperRef.current.allowTouchMove = true;
    }
  };
  return (
    <>
      <SwiperContainer>
        <HeaderArea>
          <Header />
        </HeaderArea>
        <Swiper
          onSwiper={(swiper: SwiperCore) => {
            swiperRef.current = swiper;
          }}
          pagination={pagination}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <GameSlide
              handleTouchStart={handleTouchStart}
              handleTouchEnd={handleTouchEnd}
            />
          </SwiperSlide>
          <SwiperSlide>
            <EarnSlide />
          </SwiperSlide>
          <SwiperSlide>
            <UserSlide />
          </SwiperSlide>
          <SwiperSlide>
            <InviteSlide />
          </SwiperSlide>
        </Swiper>
        {/* <SwiperDisableOverlay
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        /> */}
      </SwiperContainer>
    </>
  );
};

const HEADER_HEIGHT = "11vh";

const SwiperContainer = styled.div`
  width: 100%;
  height: 100%;
  --swiper-pagination-bottom: auto;
  --swiper-pagination-top: ${HEADER_HEIGHT};
  --swiper-pagination-bullet-height: 100%;
  --swiper-pagination-bullet-horizontal-gap: 8px;
`;

const HeaderArea = styled.div`
  height: ${HEADER_HEIGHT};
  width: 100%;
  padding: 4vh 4vw 0 4vw;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0);
`;

const SwiperDisableOverlay = styled.div`
  position: absolute;
  top: 100px; /* 無効にしたい範囲のトップ位置 */
  left: 0px; /* 無効にしたい範囲の左位置 */
  width: 100%; /* 無効にしたい範囲の幅 */
  height: 300px; /* 無効にしたい範囲の高さ */
  background: rgba(255, 255, 255, 0); /* 完全に透明にする */
  z-index: 2; /* Swiperの上に重ねる */
`;
