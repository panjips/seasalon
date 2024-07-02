import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export const HomeSwiper: React.FC = () => {
  const swipperText = [
    {
      id: 1,
      title: "WELCOME",
      image: "/swiper-image1.jpg",
    },
    {
      id: 2,
      title: "SEA Salon",
      tagline: "BEAUTY AND ELEGANCE REDEFINED",
      image: "/swiper-image2.jpg",
    },
  ];

  return (
    <section className="w-full">
      <div className="h-[90vh]">
        <Swiper
          autoplay={true}
          loop={true}
          className="h-full"
          modules={[Autoplay, Navigation, Pagination]}
        >
          {swipperText.map(({ id, image, tagline, title }) => (
            <SwiperSlide key={id}>
              <Image
                priority
                src={`${image}`}
                alt="Carousel Image"
                fill
                style={{
                  objectFit: "cover",
                  maskImage: `linear-gradient(to top, transparent, black 25%)`,
                  filter: "brightness(70%) grayscale(100%)",
                }}
              />
              <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative z-10 h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="playfair tracking-widest text-6xl lg:text-9xl font-semibold text-stone-100/90 hover:text-white transition">
                    {title}
                  </p>
                  {tagline && (
                    <p className="tracking-widest text-md sm:text-xl lg:text-2xl text-white/70 hover:text-white transition">
                      {tagline}
                    </p>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
