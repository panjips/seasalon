"use client";
import React, { useState, useEffect } from "react";
import { HomeSwiper } from "@/components/shared/HomeSwiper";
import { PageContainer } from "@/components/shared/PageContainer";
import { TextGenerateEffect } from "@/components/shared/TextGenerateEffect";
import { motion } from "framer-motion";
import Image from "next/image";
import ReviewSwiper from "@/components/shared/ReviewSwiper";
import { Review, Service, Branch, Reservation } from "@/utils/models";
import { Button, useDisclosure } from "@nextui-org/react";
import { ModalReview } from "@/components/home/review/ModalReview";
import toast from "react-hot-toast";
import { ModalReservation } from "@/components/home/reservation/ModalReservation";
import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";

export default function Home() {
  const quote = `"The right hairstyle can make a plain woman beautiful, and a beautiful woman unforgettable. Hair is the richest ornament of women, and it should be adorned with the same care as any other piece of jewelry."`;
  const services = [
    {
      title: "Haircut and Styling",
      description: `Transform your look with our expert haircuts and styling
                  services. Our skilled stylists stay updated with the latest
                  trends and techniques to ensure you leave with a hairstyle
                  that perfectly complements your personality and lifestyle. Let
                  us help you express yourself with a look that${`'`}s uniquely
                  you.`,
      img: "haircut",
    },
    {
      title: "Manicure and Pedicure",
      description: `Indulge in the ultimate pampering experience with our manicure
                  and pedicure services. Our professional nail technicians
                  provide meticulous care to keep your hands and feet looking
                  their best. From classic manicures to trendy nail art, we
                  offer a wide range of options to suit your style.`,
      img: "manicure",
    },
    {
      title: "Facial Treatments",
      description: `Reveal your skin${`'`}s natural beauty with our rejuvenating
                facial treatments. Our experienced estheticians tailor each treatment to your skin type and concerns, using high-quality products that nourish and revitalize your complexion. From deep-cleansing facials to anti-aging treatments, we provide a soothing and relaxing experience that leaves your skin glowing and healthy.`,
      img: "facial",
    },
  ];

  const [review, setReview] = useState<Review[]>();
  const [branch, setBranch] = useState<Branch[]>();
  const [service, setService] = useState<Service[]>();
  const [input, setInput] = useState<Review>({
    name: "",
    rating: 0,
    comment: "",
  });

  const [inputRes, setInputRes] = useState<Reservation>({
    name: "",
    phone_number: "",
    datetime: "",
  });

  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    async function fetchDataReview() {
      const res = await fetch("/api/v1/review", { method: "GET" });
      const data = await res.json();
      setReview(data.data);
    }
    async function fetchDataBranch() {
      const res = await fetch("/api/v1/branch", { method: "GET" });
      const data = await res.json();
      setBranch(data.data);
    }
    async function fetchDataService() {
      const res = await fetch("/api/v1/service", { method: "GET" });
      const data = await res.json();
      setService(data.data);
    }

    Promise.all([fetchDataBranch(), fetchDataReview(), fetchDataService()]);
  }, [refresh]);

  const {
    isOpen: isOpenReview,
    onOpen: onOpenReview,
    onOpenChange: onOpenChangeReview,
    onClose: onCloseReview,
  } = useDisclosure();

  const {
    isOpen: isOpenReserve,
    onOpen: onOpenReserve,
    onOpenChange: onOpenChangeReserve,
    onClose: onCloseReserve,
  } = useDisclosure();

  const handleInsert = async () => {
    try {
      const insertData = await fetch("/api/v1/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      await toast
        .promise(Promise.all([insertData]), {
          loading: "Menyimpan data...",
          success: "Data berhasil disimpan",
          error: "Gagal menyimpan data",
        })
        .then(() => {
          onCloseReview();
          setInput({ name: "", rating: 0, comment: "" });
          setRefresh(!refresh);
        });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setInput({ name: "", rating: 0, comment: "" });
    }
  };

  const handleInsertRes = async () => {
    try {
      const token: string | undefined = Cookies.get("token");

      if (token === undefined) {
        onCloseReserve();
        throw new Error("Silahkan login terlebih dahulu");
      }

      const decode = jwt.decode(token, { complete: true });
      const payload = decode?.payload;
      if (payload === undefined) {
        onCloseReserve();
        throw new Error("Silahkan login terlebih dahulu");
      }

      const userId =
        typeof payload === "string" ? payload : (payload.id as string);
      const newInput = { ...inputRes, user_id: userId };

      const insertData = await fetch("/api/v1/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInput),
      });

      await toast
        .promise(Promise.all([insertData]), {
          loading: "Menyimpan data...",
          success: "Data berhasil disimpan",
          error: "Gagal menyimpan data",
        })
        .then(() => {
          onCloseReserve();
          setInputRes({ name: "", phone_number: "", datetime: "" });
          setRefresh(!refresh);
        });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setInputRes({ name: "", phone_number: "", datetime: "" });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInputRes = (
    e: React.ChangeEvent<HTMLInputElement> | object
  ) => {
    const { name, value } = e.target;
    setInputRes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <HomeSwiper />
      <PageContainer>
        <div className="mx-6 mb-6">
          <div className="w-full flex justify-center items-center flex-col mb-6 mt-12">
            <h2 className="playfair font-bold text-slate-700/90 text-4xl mb-4">
              Our Services
            </h2>
          </div>
          <div className="w-full flex flex-col gap-8">
            {services.map((data, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8"
                >
                  <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className=" rounded-lg lg:col-span-2 flex flex-col justify-center"
                  >
                    <h3 className="text-2xl text-slate-700/90 font-bold mb-2">
                      {data.title}
                    </h3>
                    <p className="text-stone-500 text-justify md:text-left">
                      {data.description}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`order-first ${
                      index % 2 === 0 ? "lg:order-first" : "lg:order-last"
                    } h-48 w-full rounded-lg bg-gray-200 relative`}
                  >
                    <Image
                      priority
                      src={`/${data.img}.jpg`}
                      alt={data.img}
                      fill
                      sizes="1080px"
                      className="rounded-lg"
                      style={{
                        objectFit: "cover",
                        filter: "brightness(100%) grayscale(50%)",
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-center items-center flex-col mb-5 lg:mb-6 mt-12">
            <h2 className="playfair font-bold text-slate-700/90 text-4xl">
              What they said?
            </h2>
          </div>

          <div className="w-full">
            <div className="flex justify-end mb-4">
              <p
                className="font-bold cursor-pointer text-slate-400 hover:text-green-700 transition text-sm md:text-base"
                onClick={() => onOpenReview()}
              >
                + ADD YOUR REVIEW
              </p>
              <ModalReview
                isOpen={isOpenReview}
                onOpenChange={onOpenChangeReview}
                handleChange={handleChangeInput}
                insert={handleInsert}
                rating={input.rating}
              />
            </div>
            <ReviewSwiper reviews={review!} />
            <div className="w-full flex flex-col justify-center items-center mt-6 md:mt-8 mb-8 pb-6 border-b ">
              <TextGenerateEffect
                words={quote}
                className="playfair tracking-wide text-center text-base lg:text-lg text-stone-500"
              />
              <motion.p
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="font-bold playfair text-lg text-slate-700/90 mt-2"
              >
                - Martin Luther
              </motion.p>
            </div>
          </div>

          <section>
            <div className="mx-auto max-w-screen-2xl mt-12">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-slate-900/60 p-4 md:p-12 lg:px-16 lg:py-24">
                  <div className="mx-auto max-w-xl text-center">
                    <h2 className="playfair tracking-wide text-2xl font-bold text-white md:text-3xl">
                      Transform your look and feel our salon services.
                    </h2>

                    <p className="hidden text-white/90 sm:mt-4 sm:block">
                      Whether you{`'`}re in need of a fresh haircut, a relaxing
                      manicure and pedicure, or a rejuvenating facial treatment,
                      our skilled professionals are here to provide top-notch
                      care and attention to detail. Come and experience the
                      ultimate in beauty and relaxation—book your appointment
                      today and let us pamper you!
                    </p>

                    <div className="mt-4 md:mt-8">
                      <Button
                        onPress={() => onOpenReserve()}
                        className="inline-block rounded border border-white bg-white text-sm font-medium text-slate-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                      >
                        Reserve Now
                      </Button>
                      <ModalReservation
                        isOpen={isOpenReserve}
                        onOpenChange={onOpenChangeReserve}
                        handleChange={handleChangeInputRes}
                        insert={handleInsertRes}
                        input={inputRes}
                        branch={branch!}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                  <div className="w-full relative">
                    <img
                      alt=""
                      src="/reserve1.jpg"
                      className="h-40 w-full object-cover sm:h-56 md:h-full"
                      style={{
                        filter: "brightness(100%) grayscale(50%)",
                      }}
                    />
                  </div>

                  <div className="w-full relative">
                    <img
                      alt=""
                      src="/reserve2.jpg"
                      className="h-40 w-full object-cover sm:h-56 md:h-full"
                      style={{
                        filter: "brightness(100%) grayscale(50%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full flex justify-center items-center flex-col mb-5 lg:mb-6 mt-12">
            <h2 className="playfair font-bold text-slate-700/90 text-4xl">
              Any Question?
            </h2>
          </div>

          <div className="flex justify-center flex-col ">
            <p className="text-center mx-6 text-slate-600">
              We{`'`}re here to help! Whether you have questions about our
              services, need assistance with booking an appointment, or want to
              learn more about what we offer, don{`'`}t hesitate to reach out.
            </p>
          </div>
          <div className="w-full mb-12 mt-8">
            <div className="flex justify-center w-full gap-12">
              <div className="border rounded-lg px-6 py-5 shadow-sm">
                <h6 className="font-semibold text-slate-500 text-lg">Thomas</h6>
                <p className="font-light text-slate-500 text-lg">
                  08123456789 (Phone)
                </p>
              </div>
              <div className="border rounded-lg px-4 py-3 shadow-sm">
                <h6 className="font-semibold text-slate-500 text-lg">Sekar</h6>
                <p className="font-light text-slate-500 text-lg">
                  08164829372 (Phone)
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
