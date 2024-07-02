import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
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
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      switch (res.status) {
        case 200:
          toast.success(data.message);
          localStorage.setItem("user", JSON.stringify(data.data));
          if (data.data.role === "Admin") {
            router.push("/dashboard/branch");
          } else {
            router.push("/");
          }
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

        <main className="flex items-center justify-center px-12 py-12 sm:px-12 lg:col-span-7 lg:px-24 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="playfair mt-2 text-3xl md:text-4xl font-bold text-stone-700">
              Welcome to{" "}
              <Link href="/" className="font-bold text-stone-400 ">
                SEA Salon
              </Link>{" "}
              ✨
            </h1>

            <p className="mt-2 leading-relaxed text-gray-500">
              Untuk melanjutkan menikmati layanan dari salon kami dan mengakses
              semua fitur ada, silakan masuk dengan memasukkan akun Anda di
              bawah ini.
            </p>
            <form action="">
              <div className="mt-8 grid grid-cols-6 gap-6">
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
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>

                  <Input
                    variant="bordered"
                    name="password"
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
                  <p className="text-gray-500">
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
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button
                    color="default"
                    variant="faded"
                    className="px-6"
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
