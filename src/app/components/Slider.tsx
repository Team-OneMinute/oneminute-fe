"use client";
import styled from "styled-components";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "@/app/styles/swiper.css";

// slide
import { EarnSlide } from "@/app/slides/EarnSlide";
import { UserSlide } from "@/app/slides/UserSlide";
import { InviteSlide } from "@/app/slides/InviteSlide";
import { GameSlide } from "@/app/slides/GameSlide";
import { Header } from "./Organisms/Header";
const slideName = ["GAME", "EARN", "USER", "INVITE"];

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: any) {
    return `<div class="${className}"> ${slideName[index]} </div>`;
  },
};

export const Slider = () => {
  return (
    <>
      <SwiperContainer>
        <HeaderArea>
          <Header />
        </HeaderArea>
        <Swiper pagination={pagination} modules={[Pagination]}>
          <SwiperSlide>
            <GameSlide />
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
      </SwiperContainer>
    </>
  );
};

const HEADER_HEIGHT = "15vh";

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


