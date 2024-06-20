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

const SwiperContainer = styled.div`
  width: 100%;
  height: 100%;
  --swiper-pagination-bottom: auto;
  --swiper-pagination-top: 80px;
  --swiper-pagination-bullet-height: 100%;
`;

const HeaderArea = styled.div`
  width: calc(100% - 32px);
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 100%;
  z-index: 2;
`;
