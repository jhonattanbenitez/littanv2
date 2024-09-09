"use client";
import { Heart, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import MenuList from "./MenuList";
import MenuListMobile from "./MenuListMobile";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const router = useRouter();

  const handleCart = () => {
    router.push("/cart");
  };
  const handleLiked = () => {
    router.push("/liked");
  };
  const handleUser = () => {
    router.push("/profile");
  };
  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-2-4xl md:max-w-6xl">
      <Image
        src="/littan.png"
        alt="Littan"
        width={100}
        height={100}
        onClick={() => router.push("/")}
      />

      <div className="hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex sm:hidden">
        <MenuListMobile />
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-7">
        <ShoppingBag
          size={24}
          strokeWidth="1"
          className="cursor-pointer"
          onClick={handleCart}
        />
        <Heart
          size={24}
          strokeWidth="1"
          className="cursor-pointer"
          onClick={handleLiked}
        />
        <User
          size={24}
          strokeWidth="1"
          className="cursor-pointer"
          onClick={handleUser}
        />
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
