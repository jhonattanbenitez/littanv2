"use client";
import { ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import MenuList from "./MenuList";
import MenuListMobile from "./MenuListMobile";
import ToggleTheme from "./ToggleTheme";
import { useCart } from "@/hooks/use-cart";
// import { Button } from "@/components/ui/button"; // Assume using your button component
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Assuming you're using a dropdown menu component

const Navbar = () => {
  const router = useRouter();
  const cart = useCart();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, []);

  const handleCart = () => {
    router.push("/cart");
  };

  const handleUser = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    router.push("/"); // Redirect to home page after logout
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
        {cart.items.length === 0 ? (
          <ShoppingBag
            size={24}
            strokeWidth="1"
            className="cursor-pointer"
            onClick={handleCart}
          />
        ) : (
          <div className="flex gap-1">
            <ShoppingBag
              size={24}
              strokeWidth="1"
              className="cursor-pointer"
              onClick={handleCart}
            />
            <span className="font-bold">{cart.items.length}</span>
          </div>
        )}

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User size={24} strokeWidth="1" className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {token ? (
              <>
                <DropdownMenuItem onClick={handleUser}>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Salir
                </DropdownMenuItem>
              </>
            ) : (
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Acceso/Registro
                </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
