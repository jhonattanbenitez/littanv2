"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // Import the custom toast hook

const initialUser = { email: "", password: "", username: "" };

const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (!!res) {
          toast({
            title: "Success",
            description: "Registered successfully!",
            variant: "default",
          });
          setUser(initialUser);
          router.push("/login");
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

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-center text-3xl font-bold">Sign up</h2>
        <div className="space-y-4">
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUserChange}
            placeholder="Enter your full name"
            className="w-full"
          />
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            placeholder="Enter your email"
            className="w-full"
          />
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Enter password"
            className="w-full"
          />
          <Button onClick={signUp} className="w-full">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
