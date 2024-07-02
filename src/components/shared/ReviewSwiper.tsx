import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { MdOutlineStar } from "react-icons/md";
import { Review } from "@/utils/models";

export default function ReviewSwiper({ reviews }: { reviews: Review[] }) {
  const card = (data: Review) => (
    <Card className=" min-h-36 line-clamp-3 shadow-sm border py-4 px-5 rounded-lg bg-white">
      <CardHeader className="justify-between p-0 mb-3">
        <div className="flex gap-4 ">
          <div className="relative w-10 h-10">
            <Image
              priority
              alt="avatar"
              src="/avatar.jpeg"
              fill
              sizes="1080px"
              className="rounded-full"
              style={{
                objectFit: "cover",
                filter: "brightness(100%) grayscale(50%)",
              }}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-slate-700">
              {data.name}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-small leading-none text-slate-700/80">
            {data.rating}
          </p>
          <MdOutlineStar size={18} className="text-yellow-400" />
        </div>
      </CardHeader>
      <CardBody className="text-small text-slate-500 p-0">
        <p>{data.comment}</p>
      </CardBody>
    </Card>
  );

  const skeletonCard = () => {
    return (
      <div className="min-h-36 line-clamp-3 py-4 px-5 rounded-lg bg-gray-200 animate-pulse">
        <div className="flex justify-between p-0 mb-3">
          <div className="flex gap-4">
            <div className="relative w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-4 bg-gray-300 rounded"></div>
            <MdOutlineStar size={18} className="text-gray-300" />
          </div>
        </div>
        <div className="text-small text-slate-500 p-0">
          <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        {reviews
          ? reviews?.map((data: Review, index) => (
              <SwiperSlide key={index}>{card(data)}</SwiperSlide>
            ))
          : [1, 2, 3, 4, 5].map((index) => (
              <SwiperSlide key={index}>{skeletonCard()}</SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
