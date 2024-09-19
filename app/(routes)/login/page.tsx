"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // Import the custom toast hook

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          toast({
            title: "Success",
            description: "Logged in successfully!",
            variant: "default",
          });
          setUser(initialUser);
          router.push("/");
          window.location.reload();
        }
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error?.message || error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-center text-3xl font-bold">Login</h2>
        <div className="space-y-4">
          <Input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full"
          />
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full"
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
