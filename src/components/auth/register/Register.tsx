import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [form, setForm] = useState({});
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name }: { value: string; name: string } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const useLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsSubmited(true);
      const res = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      switch (res.status) {
        case 201:
          toast.success(data.message);
          router.push("/login");
          break;
        case 400:
          throw new Error(data.error);
        case 500:
          throw new Error(data.error);
        default:
          break;
      }
      setIsSubmited(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      setIsSubmited(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            priority
            alt="auth-image"
            src="/auth-image.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            style={{
              filter: "grayscale(100%)",
            }}
          />
        </aside>

        <main className="flex items-center justify-center px-12 py-12 sm:px-12 lg:px-24 lg:py-12 lg:col-span-7 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="playfair mt-2 text-3xl md:text-4xl font-bold text-stone-700">
              Welcome to{" "}
              <Link href="/" className="font-bold text-stone-400 ">
                SEA Salon
              </Link>{" "}
              ✨
            </h1>

            <p className="mt-2 text-sm md:text-base leading-relaxed text-gray-500">
              Untuk melanjutkan menikmati layanan dari salon kami, silahkan
              lakukan registrasi akun.
            </p>
            <form action="">
              <div className="mt-8 grid grid-cols-6 gap-3">
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>

                  <Input
                    type="text"
                    variant="bordered"
                    name="full_name"
                    id="full_name"
                    size="md"
                    radius="sm"
                    onChange={handleChange}
                    classNames={{
                      inputWrapper: "border",
                    }}
                  />
                </div>

                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>

                  <Input
                    type="number"
                    variant="bordered"
                    name="phone_number"
                    id="phone_number"
                    size="md"
                    radius="sm"
                    onChange={handleChange}
                    classNames={{
                      inputWrapper: "border",
                    }}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>

                  <Input
                    type="text"
                    variant="bordered"
                    name="email"
                    id="email"
                    size="md"
                    radius="sm"
                    onChange={handleChange}
                    classNames={{
                      inputWrapper: "border",
                    }}
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>

                  <Input
                    variant="bordered"
                    name="password"
                    id="password"
                    size="md"
                    radius="sm"
                    onChange={handleChange}
                    classNames={{
                      inputWrapper: "border",
                    }}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                </div>
                <div className="col-span-6">
                  <p className="text-gray-500 text-sm md:text-base">
                    Dont{"`"}t have an account yet?{" "}
                    <Link
                      href="/register"
                      className="text-lime-500 hover:text-lime-600 cursor-pointer transition"
                    >
                      {" "}
                      Sign Up
                    </Link>
                  </p>
                </div>

                <div className="col-span-6 mt-2">
                  <Button
                    color="default"
                    variant="faded"
                    radius="sm"
                    className="px-6 text-sm md:text-base"
                    isLoading={isSubmited}
                    isDisabled={isSubmited}
                    onClick={useLogin}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};
